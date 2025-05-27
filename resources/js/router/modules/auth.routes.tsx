import IRoute from '@/interfaces/IRoute';
import { lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/AuthPages/LoginPage'));

export enum AuthRoutes {
    Login = '/login',
}

export const authRoutes: IRoute[] = [{ path: AuthRoutes.Login, name: 'Login',  element: <LoginPage />, layout: 'blank' }];
