import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
@ApiTags('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) {}

    @Post()
    @ApiOperation({ summary: 'Create exchange' })
    @ApiResponse({ status: 403, description: ' Forbidden.' })
    public async create(@Body() currencRequest: CreateExchangeDto): Promise<ICurrencyCreateResponse> {
      let result: ICurrencyCreateResponse;
      console.log(currencyRequest);
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
  
    @Get()
    @ApiResponse({
      status: 200,
      description: 'The found record',
    })
    public async getAllUser(): Promise<IUser[]> {
     return this.currencyService.all();
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
