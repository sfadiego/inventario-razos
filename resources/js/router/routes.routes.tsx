import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import IRoute from '@/interfaces/IRoute';
import AppLayout from '@/layout/AppLayout';
import { createBrowserRouter } from 'react-router';
import { adminRoutes } from './modules/admin.routes';
import { authRoutes } from './modules/auth.routes';
import { errorRoutes } from './modules/error.routes';

const routes: IRoute[] = [...authRoutes, ...adminRoutes, ...errorRoutes].map((route: IRoute) => {
    return {
        ...route,
        element: route.private && route.element ? <PrivateRoute route={route} element={route.element} /> : route.element,
    };
});

const blankRoutes = routes.filter((item) => item.layout == 'blank');
export const router = createBrowserRouter([
    ...blankRoutes,
    {
        path: '/',
        element: <AppLayout />,
        children: routes,
    },
]);
