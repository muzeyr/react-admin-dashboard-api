import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://muzer:FvsEjYdL7CaA3qv2@cluster0.qerqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    UserModule,
    CurrencyModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
