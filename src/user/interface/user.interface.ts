import { Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  is_active:boolean;
  exchanges?: any[]
  compareEncryptedPassword: (password: string) => boolean;
  getEncryptedPassword: (password: string) => string;
}
