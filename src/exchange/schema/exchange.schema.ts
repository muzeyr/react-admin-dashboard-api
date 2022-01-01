import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Coin } from '../interface/coin.interface';
import { UserSchema } from 'src/user/schema/user.schema';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

export interface IExchangeSchema extends mongoose.Document {
  
  fromCoin:string;
  fromQuantity: number;
  fromValue:number;
  type: number;
  timeStamp: Date;
  description: String;
  user: Object;
}

export const ExchangeSchema = new mongoose.Schema<IExchangeSchema>(
  {
    fromCoin: {
      type: String,
      required: [true, 'fromCoin can not be empty'],
    },
    fromQuantity: {
      required: [true, 'fromQuantity can not be empty'],
      type: Number,
    },
    fromValue: {
      type: Number,
      required: [true, 'quantityTo can not be empty'],
    },
    type: {
      required: [true, 'CoinTo can not be empty'],
      type: Number,
    }, 
    description: {
      required: [false, 'Description can not be empty'],
      type: String,
    },
    user: {
      required:[true,'User can not be empty'],
      type: UserSchema
    },
    timeStamp:{
       type: Date
    },
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);


ExchangeSchema.pre('save', async function (next) {
  this.timeStamp = new Date();
  next();
});
