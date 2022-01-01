import { Condition, Document } from 'mongoose';
import { Coin } from './coin.interface';

export interface IExchange extends Document {
  id?: string;
  quantityFrom: number;
  quantityTo: number;
  coinFrom: Coin;
  coinTo: Coin;
  time_stamp: string;
  toValue: string;
  type: string;
  user: string;
}
