import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  
}

export interface ICurrencySchema extends mongoose.Document {
  name: string;
  value: string;
  unit: string;
  icon: string;
  created_at: any;
}

export const CurrencySchema = new mongoose.Schema<ICurrencySchema>(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    icon: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
    value: {
      type: String,
      required: [true, 'Value can not be empty'],
    },
    unit: {
      type: String,
      required: [true, 'Uni can not be empty'],
    },
    created_at: { 
      type: Date, 
      required: true, 
      default: Date.now 
    }
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

CurrencySchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

CurrencySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  next();
});
