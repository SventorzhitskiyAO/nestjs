import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersGuards } from '../guards/users.guards';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.services';

import { ReqDto } from '../interface/Req.interface';
import { LoginDto } from '../users/dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(UsersGuards)
  @ApiResponse({
    status: 200,
    description: 'Get user on token',
    type: [UserDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  getUserByToken(@Req() request: ReqDto): UserDto {
    return request.user;
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
