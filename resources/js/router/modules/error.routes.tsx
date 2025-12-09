import IRoute from '@/interfaces/IRoute';
import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/OtherPage/NotFound'));

export enum ErrorRoutes {
  Forbidden = '/forbidden',
}

export const errorRoutes: IRoute[] = [
  {
    path: '*',
    name: 'No encontrada',
    element: <NotFoundPage />,
    layout: 'blank',
  },
  {
    path: ErrorRoutes.Forbidden,
    name: 'Sin permisos',
    element: <NotFoundPage />,
    layout: 'blank',
  },
];
