import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  password: string;
}
