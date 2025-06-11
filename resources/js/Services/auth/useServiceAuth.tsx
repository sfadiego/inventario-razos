import { usePOST } from '@/hooks/useApi';
import { IAuthResponse } from '@/interfaces/auth';

const urlAuth = '/api/auth/';
export const useServiceLogin = () => usePOST<IAuthResponse>({ url: `${urlAuth}login` });
export const useServiceRegister = () => usePOST<IAuthResponse>({ url: `${urlAuth}register` });
