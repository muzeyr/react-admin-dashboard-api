import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { ExchangeService } from './exchange.service';
import { IExchangeCreateResponse } from './interface/exchange-create-response.interface';
import { IExchange } from './interface/exchange.interface';
import { UpdateExchagneDto } from './dto/update-exchange.dto';
import { User } from 'src/user/user.decorator';

@Controller('exchange')
@ApiTags('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) {}

    @Post()
    @ApiOperation({ summary: 'Create exchange' })
    @ApiResponse({ status: 403, description: ' Forbidden.' })
    public async create(@User('id') userId: string,@Body() exchange: CreateExchangeDto): Promise<IExchangeCreateResponse> {
      exchange.userID = userId;
      console.log(userId);
      let result: IExchangeCreateResponse;
      if (exchange) {
        try {
          console.log(exchange);
          const created = await this.exchangeService.create(exchange);
          result = {
            status: HttpStatus.CREATED,
            message: "exchange_create_success",
            exchange: created,
            errors: null,
          };
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: "exchange_create_precondition_failed",
            exchange: null,
            errors: e.errors,
          };
        }
       
      } else {
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: "exchange_create_bad_request",
          exchange: null,
          errors: null,
        };
      }
  
      return result;
    }
  
    @Get()
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    public async getAllUser(): Promise<IExchange[]> {
     return this.exchangeService.all();
    }

    @Get('/coin/:coin')
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    async getProfile(@User('id') userId: string,@Param('coin') coin: string): Promise<any> {
      return await this.exchangeService.findCoin(userId,coin);
    }
  
    @ApiResponse({
      status: 200,
      description: 'Update exchange',
    })
    @Put()
    async update(@Body() userData: UpdateExchagneDto) {
      return await this.exchangeService.update(userData);
    }
  
}
