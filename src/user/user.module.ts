import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyService } from '../currency/currency.service';
import { CurrencySchema } from '../currency/schema/currency.schema';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [CurrencyModule,
            MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Currency', schema: CurrencySchema }])],
  controllers: [UserController],
  providers: [UserService,CurrencyService ],
})
export class UserModule {}
