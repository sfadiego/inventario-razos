import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import IRoute from '@/interfaces/IRoute';
import AppLayout from '@/layout/AppLayout';
import { createBrowserRouter } from 'react-router';
import { adminRoutes } from './modules/admin.routes';
import { authRoutes } from './modules/auth.routes';
import { errorRoutes } from './modules/error.routes';

const routes: IRoute[] = [...authRoutes, ...adminRoutes, ...errorRoutes].map((route: IRoute) => {
  const element = route.layout === 'blank' ? route.element : <AppLayout>{route.element}</AppLayout>;
  return {
    ...route,
    element: route?.private ? <PrivateRoute route={route} element={element} /> : element,
  };
});

export const router = createBrowserRouter(routes);
