import { Document } from 'mongoose';

export interface IExchange extends Document {
  id?: string;
  name: string;
  value: string;
  unit: string;
  time_stamp: string
}
