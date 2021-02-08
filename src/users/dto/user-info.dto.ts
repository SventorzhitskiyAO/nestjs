import { User } from '../schemas/users,scheme';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
