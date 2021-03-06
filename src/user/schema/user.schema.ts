import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ExchangeSchema, IExchangeSchema } from '../../exchange/schema/exchange.schema';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
//  delete ret._id;
//  delete ret.password;
}

export interface IUserSchema extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar: string;
  comparePassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;
  exchanges: IExchangeSchema[]
}

const exchange = new mongoose.Schema({
  description: { type: String },
  quantityFrom: { type: Number, required: true },
  quantityTo: { type: Number, required: true },
  coinFrom: { type: Object, required: true },
  coinTo: { type: Object, required: true },
  timeStamps:{ type:Date },

})

export const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email should be valid',
      ],
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    avatar: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    surname: {
      required: [true, 'Surname can not be empty'],
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      minlength: [6, 'Password should include at least 6 chars'],
    },
    exchanges: [exchange],
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});
