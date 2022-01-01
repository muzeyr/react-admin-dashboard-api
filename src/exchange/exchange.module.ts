import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeController } from './exchange.controller';
import { ExchangeSchema } from './schema/exchange.schema';
import { ExchangeService } from './exchange.service';
import { UserSchema } from '../user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Exchange', schema: ExchangeSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService],
  exports: []
})
export class ExchangeModule {}
