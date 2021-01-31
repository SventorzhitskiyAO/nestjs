import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users,scheme';
import { Model } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(usersDto: CreateUsersDto): Promise<User> {
    const newUser = new this.userModel(usersDto);
    return newUser.save();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, userDto: UpdateUsersDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto);
  }
}
