import { AdminRoutes } from './modules/admin.routes';
import { AuthRoutes } from './modules/auth.routes';
import { ErrorRoutes } from './modules/error.routes';

export type IRoutes = AuthRoutes | ErrorRoutes | AdminRoutes;
