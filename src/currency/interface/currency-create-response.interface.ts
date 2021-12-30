import { ICurrency } from './currency.interface';

export interface ICurrencyCreateResponse {
  status: number;
  message: string;
  currency: ICurrency | null;
  errors: { [key: string]: any } | null;
}
