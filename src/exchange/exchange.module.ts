import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeController } from './exchange.controller';
import { ExchangeSchema } from './schema/exchange.schema';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }])],
  controllers: [ExchangeController],
  providers: [ExchangeService]
})
export class ExchangeModule {}
