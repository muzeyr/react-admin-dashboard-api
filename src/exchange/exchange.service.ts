import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExchange } from './interface/exchange.interface';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchagneDto } from './dto/update-exchange.dto';
import { IUser } from '../../dist/user/interface/user.interface';

@Injectable()
export class ExchangeService {
  constructor(@InjectModel('Exchange') private readonly model: Model<IExchange>,
              @InjectModel('User') private readonly userModel: Model<IUser>) {}
  
  public async search(params: { email: string }): Promise<IExchange[]> {
    return this.model.find(params).exec();
  }
  

  public async findCoin(userID: string,coin: string){
    return this.model.findOne({ userID, fromCoin:coin});
  }
  public async create(user: CreateExchangeDto): Promise<IExchange> {
    user.userID = this.userModel.findOne({_id: user.userID});
    const model = new this.model(user);
    return await model.save();
  }
  
  public async all(): Promise<any> {
    const params =  { email: '' };
    return this.model.find().exec();
  }
  
  async update(dto: UpdateExchagneDto): Promise<IExchange> {
     let toUpdate = await this.model.findOne({_id:dto.id});

    let updated = Object.assign(toUpdate, dto);
    const model = new this.model(updated);

    return await model.save();
  }

}

