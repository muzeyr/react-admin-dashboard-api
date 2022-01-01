import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyService } from './currency.service';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ICurrencyCreateResponse } from './interface/currency-create-response.interface';
import { IUser } from '../user/interface/user.interface';
import { User } from 'src/user/user.decorator';

@Controller('currency')
@ApiTags('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Post()
    @ApiOperation({ summary: 'Create currency' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async create(@Body() currencyRequest: CreateCurrencyDto): Promise<ICurrencyCreateResponse> {
      let result: ICurrencyCreateResponse;

      if (currencyRequest) {
        const usersWithEmail = await this.currencyService.search({
          currency: currencyRequest.name,
        });
        try {
          const createdCurrency = await this.currencyService.create(currencyRequest);
          result = {
            status: HttpStatus.CREATED,
            message: "currency_create_success",
            currency: createdCurrency,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: "currency_create_precondition_failed",
            currency: null,
            errors: e.errors,
          };
        }
       
      } else {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: "currency_create_bad_request",
          currency: null,
          errors: null,
        };
      }
  
      return result;
    }
  
    @Get('/withQuantity')
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    public async getAll(@User('id') userId: string): Promise<IUser[]> {
     return await this.currencyService.allWithCalculate(userId);
    }

    @Get()
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    public async get(): Promise<IUser[]> {
     return await this.currencyService.all();
    }
    
    @Get('/calculate')
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    public async calculate(@User('id') userId: string): Promise<IUser[]> {
     return await this.currencyService.allWithCalculate(userId);
    }

    @ApiResponse({
      status: 200,
      description: 'Update currency',
    })
    @Put()
    async update(@Body() userData: UpdateCurrencyDto) {
      return await this.currencyService.update(userData);
    }
  
  
}
