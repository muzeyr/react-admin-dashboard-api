import { IExchange } from './exchange.interface';

export interface IExchangeCreateResponse {
  status: number;
  message: string;
  exchange: IExchange | null;
  errors: { [key: string]: any } | null;
}
