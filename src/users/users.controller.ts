import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { User } from './schemas/users,scheme';
import { LoginDto } from './dto/login.dto';
import { UsersGuards } from '../guards/users.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(UsersGuards)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) user: CreateUsersDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUser: UpdateUsersDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUser);
  }

  @Post('/login')
  login(@Body() loginBody: LoginDto) {
    return this.usersService.login({ ...loginBody });
  }
}
