import IRoute from '@/interfaces/IRoute';
import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/OtherPage/NotFound'));

export enum ErrorRoutes {
    Forbidden = '/forbidden',
}

export const errorRoutes: IRoute[] = [
    {
        path: '*',
        name: 'Not found',
        element: <NotFoundPage />,
        layout: 'blank',
    },
    {
        path: ErrorRoutes.Forbidden,
        name: 'Not found',
        element: <NotFoundPage />,
        layout: 'blank',
    },
];
