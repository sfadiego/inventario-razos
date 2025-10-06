import { IUser } from '@/models/user.interface';

export interface ISignInForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
}
