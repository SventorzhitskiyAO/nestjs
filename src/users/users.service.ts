import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { CreateUsersDto } from './dto/create-users.dto';
import { User, UserDocument } from './schemas/users,scheme';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { ConfigService } from '@nestjs/config';
import { UserLoginDto } from './dto/userr-login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getByLogin(login: UserLoginDto): Promise<User> {
    return this.userModel.findOne(login);
  }

  async create(usersDto: CreateUsersDto): Promise<User> {
    const newUser = new this.userModel(usersDto);
    return newUser.save();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, user: UpdateUsersDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: { ...user } },
      {
        new: true,
      },
    );
  }

  async login({ login, password }): Promise<UserInfoDto> {
    try {
      const jwtToken = this.configService.get('JWT_SECRET');
      const user = await this.checkCredentials(login, password);
      const token = jwt.sign({ login }, jwtToken);
      return { user, token };
    } catch (e) {
      throw new HttpException('Wrong login or password', 400);
    }
  }

  private async checkCredentials(login: string, password: string) {
    const user = await this.userModel.findOne({ login: login });
    const loginTrue = bcrypt.compareSync(password, user.password);
    if (loginTrue) {
      return user;
    } else {
      throw new Error('Wrong login or password');
    }
  }
}
