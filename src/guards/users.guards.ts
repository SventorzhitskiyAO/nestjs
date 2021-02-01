import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../users/schemas/users,scheme';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersGuards implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      return this.checkJWT(request);
    } catch (e) {
      return false;
    }
  }

  async checkJWT(request): Promise<boolean> {
    if (!request.headers['authorization']) {
      return false;
    }
    try {
      const token = request.headers['authorization']
        .toString()
        .replace('Bearer ', '');
      const userInfo = jwt.verify(token, 'secret');
      console.log(userInfo);
      if (userInfo) {
        const user = await this.userModel
          .findOne({ login: userInfo.login })
          .exec();
        request.user = user;
        if (user) {
          return true;
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}
