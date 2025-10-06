import { IUser } from '@/models/user.interface';
import { AxiosInstance } from 'axios';

export interface IAuthContextType {
  authToken: string | null;
  user: IUser | null;
  isAuth: boolean;
  saveAuth: (accessToken: string, user: IUser) => void;
  logout: () => void;
  axiosApi: AxiosInstance;
  updateUser: (user: IUser) => void;
}
