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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    type: [UserDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(UsersGuards)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiBody({ type: CreateUsersDto })
  @ApiResponse({
    status: 201,
    description: 'Get new users',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  create(@Body(new ValidationPipe()) user: CreateUsersDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Update and get new user',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({ type: UpdateUsersDto })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUser: UpdateUsersDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUser);
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Get users and token',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({ type: LoginDto })
  login(@Body() loginBody: LoginDto) {
    return this.usersService.login(loginBody);
  }
}
