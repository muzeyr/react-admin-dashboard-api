import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExchange } from './interface/exchange.interface';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchagneDto } from './dto/update-exchange.dto';
import { IUser } from '../user/interface/user.interface';
import { ExchangeSchema } from './schema/exchange.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ExchangeService {
  constructor(@InjectModel('Exchange') private readonly model: Model<IExchange>,
              @InjectModel('User') private readonly userModel: Model<IUser>) { }

  public async search(params: { email: string }): Promise<IExchange[]> {
    return this.model.find(params).exec();
  }


  public async findCoin(userID: string, coin: string): Promise<any> {
    let exchange = await this.model.aggregate([
      {
        $match: {
         'fromCoin': coin
        },
      },
      {
        $group:
        {
          _id: { user: '$user._id', type: '$type'},
          totalValue: { $sum: '$fromQuantity' },
          type: { $first: '$type' }
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
  public async create(exchange: CreateExchangeDto): Promise<IExchange> {
    let userTmp = await this.userModel.findOne({ _id: exchange.user });
    delete userTmp.exchanges;
    exchange.user = userTmp;
    const model = new this.model(exchange);
    return await model.save();
  }

  public async all(userId: string): Promise<any> {
    const params = { 'user._id': userId};
    return this.model.find(params).exec();
  }

  async update(dto: UpdateExchagneDto): Promise<IExchange> {
    let toUpdate = await this.model.findOne({ _id: dto.id });

    let updated = Object.assign(toUpdate, dto);
    const model = new this.model(updated);

    return await model.save();
  }

}

