import { useAxios } from '@/hooks/useAxios';
import IRoute from '@/interfaces/IRoute';
import { AuthRoutes } from '@/router/modules/auth.routes';
import { ErrorRoutes } from '@/router/modules/error.routes';
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({ element, route }: { element: ReactElement; route: IRoute }) => {
  const { isAuth, user } = useAxios();
  if (!isAuth) return <Navigate to={AuthRoutes.Login} />;

  if (route.hasPermission != undefined && !route.hasPermission(user!)) {
    return <Navigate to={ErrorRoutes.Forbidden} />;
  }

  return React.isValidElement(element) ? element : <Navigate to={ErrorRoutes.Forbidden} />;
};

export default PrivateRoute;
