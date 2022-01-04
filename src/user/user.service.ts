import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SECRET } from 'src/config';
const jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  
  public async search(params: { email: string }): Promise<IUser[]> {
    return this.userModel.find(params).exec();
  }
  
  public async create(user: CreateUserDto): Promise<IUser> {
    const userModel = new this.userModel(user);
    return await userModel.save();
  }
  
  public async all(): Promise<any> {
    const params =  { email: '' };
    return this.userModel.find().exec();
  }
  
  async update(dto: UpdateUserDto): Promise<IUser> {
     let toUpdate = await this.userModel.findOne({_id:dto.id});
    delete toUpdate.password;

    let updated = Object.assign(toUpdate, dto);
    const userModel = new this.userModel(updated);

    return await userModel.save();
  }

  async   findOne({email, password}: LoginUserDto): Promise<any> {
    const  user = await this.userModel.findOne({email});

    if (!user) {
      return null;
    }
    if (bcrypt.hash(user.password, password)) {
      return user;
    }

    return null;
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

}

