import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiPipeModule } from 'nestjs-joi';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/users,scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JoiPipeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
