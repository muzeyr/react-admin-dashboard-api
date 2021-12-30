import { Controller, Post, HttpStatus, Body, Get, Req, Put, Delete, Param } from '@nestjs/common';
import { IUserCreateResponse } from "./interface/user-create-response.interface";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller("user")
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async create(@Body() userRequest: CreateUserDto
  ): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;
    console.log(userRequest);
    if (userRequest) {
      const usersWithEmail = await this.userService.search({
        email: userRequest.email,
      });

      if (usersWithEmail && usersWithEmail.length > 0) {
        result = {
          status: HttpStatus.CONFLICT,
          message: "user_create_conflict",
          user: null,
          errors: {
            email: {
              message: "Email already exists",
              path: "email",
            },
          },
        };
      } else {
        try {
          //userRequest.is_confirmed = false;
          const createdUser = await this.userService.create(userRequest);
          delete createdUser.password;
          result = {
            status: HttpStatus.CREATED,
            message: "user_create_success",
            user: createdUser,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: "user_create_precondition_failed",
            user: null,
            errors: e.errors,
          };
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: "user_create_bad_request",
        user: null,
        errors: null,
      };
    }

    return result;
  }

  @Get()
  public async getAllUser(  ): Promise<any> {

   return this.userService.all();
  }


  @Put()
  async update(@Body() userData: UpdateUserDto) {
    return await this.userService.update(userData);
  }


  
}
