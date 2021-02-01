import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class UpdateUsersDto {
  @IsString()
  @MaxLength(20)
  @MinLength(3)
  name?: string;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  login?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @MinLength(5)
  @Matches(/[a-zA-Z0-9]{3,30}$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(20)
  @Match('password')
  passwordConfirm?: string;
}
