import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users,scheme';
import { AuthController } from './aurh.controller';
import { UsersService } from '../users/users.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
