import { Document } from 'mongoose';

export interface ICurrency extends Document {
  id?: string;
  name: string;
  value: string;
  unit: string;
  time_stamp: string
}
