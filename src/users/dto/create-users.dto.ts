import { IsString, MaxLength, MinLength } from 'class-validator';
import { Matches } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  login: string;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @Matches(/[a-zA-Z0-9]{3,30}$/, {
    message: 'password too weak',
  })
  password: string;
}
