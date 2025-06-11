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
    { private: true, path: AdminRoutes.Dashboard, name: 'Dashboard', element: <DashboardPage /> },
    { private: true, path: AdminRoutes.Venta, name: 'Ventas', element: <VentasPage /> },
    { private: true, path: AdminRoutes.Proveedores, name: 'Provedores', element: <ProveedoresPage /> },
    { private: true, path: AdminRoutes.Productos, name: 'Productos', element: <ProductosPage /> },
    { private: true, path: AdminRoutes.Reportes, name: 'Reportes', element: <ReportesPage /> },
    { private: true, path: AdminRoutes.Ubicaciones, name: 'Ubicaciones', element: <UbicacionesPage /> },
    { private: true, path: AdminRoutes.Clientes, name: 'Clientes', element: <ClientesPage /> },
];
