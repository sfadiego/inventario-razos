import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import IRoute from '@/interfaces/IRoute';
import AppLayout from '@/layout/AppLayout';
import { createBrowserRouter } from 'react-router';
import { adminRoutes } from './modules/admin.routes';
import { authRoutes } from './modules/auth.routes';
import { errorRoutes } from './modules/error.routes';

const routes: IRoute[] = [...authRoutes, ...adminRoutes, ...errorRoutes];
const finalRoutes = routes.map((route: IRoute) => {
    return {
        ...route,
        element: route.private && route.element ? <PrivateRoute route={route} element={route.element} /> : route.element,
    };
});

// const blankLayoutRoutes = finalRoutes.filter((item) => item.layout == 'blank');
// console.log(blankLayoutRoutes, finalRoutes);
// console.log(routes, finalRoutes);
export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: finalRoutes,
    },
]);
