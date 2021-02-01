import { User } from '../schemas/users,scheme';

export class UserInfoDto {
  user: User;
  token: string;
}
