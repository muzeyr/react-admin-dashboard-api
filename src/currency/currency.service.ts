import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICurrency } from './interface/currency.interface';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Model } from 'mongoose';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Coin } from '../exchange/interface/coin.interface';
import { IExchange } from '../exchange/interface/exchange.interface';
import * as mongoose from 'mongoose';


@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel('Currency') private readonly currencyModel: Model<ICurrency>,
    @InjectModel('Exchange') private readonly exchangeModel: Model<IExchange>
    ) { }

  public async search(params: { currency: string }): Promise<ICurrency[]> {
    return this.currencyModel.find(params).exec();
  }
  public async findByName(params: { name: string }): Promise<Coin> {
    return this.currencyModel.findOne(params).exec();
  }
  public async create(user: CreateCurrencyDto): Promise<ICurrency> {
    const userModel = new this.currencyModel(user);
    return await userModel.save();
  }

  public async all(): Promise<any> {
    return this.currencyModel.find().exec();;
  }
  
  public async allWithCalculate(userId: string): Promise<any> {
    let latestCoins= [];
    let currencies = await this.currencyModel.find().exec();

    const ObjectId = mongoose.Types.ObjectId;
   

      let exchange = await this.exchangeModel.aggregate([
        {
          $match: {
            'user._id': new ObjectId(userId)
          },
        },
        {
          $group:
          {
            _id: { user: '$user._id', type: '$type', fromCoin:'$fromCoin'},
            totalValue: { $sum: '$fromQuantity' },
            type: { $first: '$type' },
            coin: { $first: '$fromCoin' },
            fromValue: { $first: '$fromValue' },
          }
        }
      ]).then(result => {
        return result;
  
      }).catch(error => {
        console.log(error)
        return error;
  
      });
    return exchange;
  }
  async update(dto: UpdateCurrencyDto): Promise<ICurrency> {
    let toUpdate = await this.currencyModel.findOne({ _id: dto.id });

    let updated = Object.assign(toUpdate, dto);
    const userModel = new this.currencyModel(updated);

    return await userModel.save();
  }

}
