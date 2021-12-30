import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICurrency } from './interface/currency.interface';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { Model } from 'mongoose';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(@InjectModel('Currency') private readonly currencyModel: Model<ICurrency>) {}
  
    public async search(params: { currency: string }): Promise<ICurrency[]> {
    return this.currencyModel.find(params).exec();
  }
  
  public async create(user: CreateCurrencyDto): Promise<ICurrency> {
    const userModel = new this.currencyModel(user);
    return await userModel.save();
  }
  
  public async all(): Promise<any> {
    const params =  { email: '' };
    return this.currencyModel.find().exec();
  }
  
  async update(dto: UpdateCurrencyDto): Promise<ICurrency> {
     let toUpdate = await this.currencyModel.findOne({_id:dto.id});

    let updated = Object.assign(toUpdate, dto);
    const userModel = new this.currencyModel(updated);

    return await userModel.save();
  }

}
