import IRoute from '@/interfaces/IRoute';
import { BadgeDollarSign, BookOpenText, Cog, FolderSearch, Home, ListChecks, UserSearch } from 'lucide-react';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/Dashboard/Home'));
const ProovedoresPage = lazy(() => import('@/pages/Proovedores/ProovedoresPage'));
const ProductosPage = lazy(() => import('@/pages/Productos/ProductosPage'));
const ReportesPage = lazy(() => import('@/pages/Reportes/ReportesPage'));
const CatalogosPage = lazy(() => import('@/pages/Catalogos/CatalogosPage'));
const UbicacionesPage = lazy(() => import('@/pages/Ubicaciones/UbicacionesPage'));
const ClientesPage = lazy(() => import('@/pages/Clientes/ClientesPage'));

export enum AdminRoutes {
    Dashboard = '/',
    Proovedores = '/admin/proveedores',
    Productos = '/admin/products',
    Reportes = '/admin/reportes',
    Catalogos = '/admin/catalogos',
    Ubicaciones = '/admin/ubicaciones',
    Clientes = '/admin/clientes',
}

export const adminRoutes: IRoute[] = [
    { path: AdminRoutes.Dashboard, name: 'Dashboard', icon: <Home />, element: <DashboardPage /> },
    { path: AdminRoutes.Proovedores, name: 'Proovedores', icon: <BadgeDollarSign />, element: <ProovedoresPage /> },
    { path: AdminRoutes.Productos, name: 'Productos', icon: <Cog />, element: <ProductosPage /> },
    { path: AdminRoutes.Reportes, name: 'Reportes', icon: <BookOpenText />, element: <ReportesPage /> },
    { path: AdminRoutes.Catalogos, name: 'Catalogos', icon: <ListChecks />, element: <CatalogosPage /> },
    { path: AdminRoutes.Ubicaciones, name: 'Ubicaciones', icon: <FolderSearch />, element: <UbicacionesPage /> },
    { path: AdminRoutes.Clientes, name: 'Clientes', icon: <UserSearch />, element: <ClientesPage /> },
];
