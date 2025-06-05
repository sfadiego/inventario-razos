import IRoute from '@/interfaces/IRoute';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/Dashboard/Home'));
const VentasPage = lazy(() => import('@/pages/Venta/VentasPage'));
const ProveedoresPage = lazy(() => import('@/pages/Proveedores/ProveedoresPage'));
const ProductosPage = lazy(() => import('@/pages/Productos/ProductosPage'));
const ReportesPage = lazy(() => import('@/pages/Reportes/ReportesPage'));

const UbicacionesPage = lazy(() => import('@/pages/Ubicaciones/UbicacionesPage'));
const ClientesPage = lazy(() => import('@/pages/Clientes/ClientesPage'));

export enum AdminRoutes {
    Dashboard = '/',
    Venta = '/ventas',
    Proveedores = '/admin/proveedores',
    Productos = '/admin/productos',
    Reportes = '/admin/reportes',
    Ubicaciones = '/admin/ubicaciones',
    Clientes = '/admin/clientes',
}

export const adminRoutes: IRoute[] = [
    { path: AdminRoutes.Dashboard, name: 'Dashboard', element: <DashboardPage /> },
    { path: AdminRoutes.Venta, name: 'Ventas', element: <VentasPage /> },
    { path: AdminRoutes.Proveedores, name: 'Provedores', element: <ProveedoresPage /> },
    { path: AdminRoutes.Productos, name: 'Productos', element: <ProductosPage /> },
    { path: AdminRoutes.Reportes, name: 'Reportes', element: <ReportesPage /> },
    { path: AdminRoutes.Ubicaciones, name: 'Ubicaciones', element: <UbicacionesPage /> },
    { path: AdminRoutes.Clientes, name: 'Clientes', element: <ClientesPage /> },
];
