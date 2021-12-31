import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
}

export interface IExchangeSchema extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  getEncryptedPassword: (password: string) => Promise<string>;
}

export const ExchangeSchema = new mongoose.Schema<IExchangeSchema>(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    surname: {
      required: [true, 'Surname can not be empty'],
      type: String,
    },
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

ExchangeSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

ExchangeSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

ExchangeSchema.pre('save', async function (next) {
  
  next();
});
