import { Document } from 'mongoose';

export interface ICurrency extends Document {
  id?: string;
  name: string;
  value: string;
  unit: string;
  url: string;
  time_stamp: string
}
