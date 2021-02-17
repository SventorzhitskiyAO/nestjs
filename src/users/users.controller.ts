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
// import { UsersGuards } from '../guards/users.guards';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Roles } from '../decorators/roles.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { UserRoles } from '../constants/users-role.enum';
import { UserLoginDto } from './dto/userr-login.dto';

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

  // @Roles(UserRoles.Admin)
  // @UseGuards(UsersGuards) // TODO I have to think and decide to delete or not, because check token there is in RolesGuard
  // @UseGuards(RolesGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: UserDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
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
    console.log(1);
    return this.usersService.create(user);
  }

  // @Roles(UserRoles.Admin)
  // @UseGuards(RolesGuard)
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

  @Post('/userName')
  @ApiBody({ type: UserLoginDto })
  getUserLogin(@Body() login: UserLoginDto) {
    return this.usersService.getByLogin(login);
  }
}
