import { RolesEnum } from '@/enums/RolesEnum';
import IRoute from '@/interfaces/IRoute';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/Dashboard/Home'));
const MarcaPage = lazy(() => import('@/pages/Marcas/MarcaPage'));
const ReportingPage = lazy(() => import('@/pages/ErrorReporting/ErrorReportingPage'));
const VentasPage = lazy(() => import('@/pages/Venta/VentasPage'));
const ProductosVentaPage = lazy(() => import('@/pages/ProductosVenta/ProductosVentaPage'));
const ProveedoresPage = lazy(() => import('@/pages/Proveedores/ProveedoresPage'));
const ProductosPage = lazy(() => import('@/pages/Productos/ProductosPage'));
const ReportesPage = lazy(() => import('@/pages/Reportes/ReportesPage'));

const UbicacionesPage = lazy(() => import('@/pages/Ubicaciones/UbicacionesPage'));
const ClientesPage = lazy(() => import('@/pages/Clientes/ClientesPage'));
const ImportProductsPage = lazy(() => import('@/pages/Importar/ImportProductsPage'));
const ImportImagesPage = lazy(() => import('@/pages/Importar/ImportProductsImagesPage'));
const CategoriaPage = lazy(() => import('@/pages/Categoria/CategoriaPage'));
const SubcategoriaPage = lazy(() => import('@/pages/Subcategoria/SubcategoriaPage'));
const DevolucionesPage = lazy(() => import('@/pages/Devoluciones/DevolucionesPage'));

export enum AdminRoutes {
  Dashboard = '/',
  Venta = '/venta',
  VentaProductos = '/venta/:id/productos',
  Proveedores = '/admin/proveedores',
  Productos = '/admin/productos',
  Reportes = '/admin/reportes',
  Ubicaciones = '/admin/ubicaciones',
  Clientes = '/admin/clientes',
  Importar = '/admin/importar',
  ImportarImagenes = '/admin/importar-imagenes',
  Marcas = '/admin/marcas',
  Categorias = '/admin/categorias',
  Subcategorias = '/admin/categorias/:id/subcategorias',
  ErrorReporting = '/admin/manager/error-reporting',
  Devoluciones = '/admin/devoluciones',
}

export enum ApiRoutes {
  Venta = '/api/ventas',
  VentaProductos = '/api/venta-producto',
  Proveedores = '/api/proveedores',
  Productos = '/api/productos',
  Reportes = '/api/reporte-movimientos',
  Ubicaciones = '/api/ubicaciones',
  Clientes = '/api/clientes',
  Devoluciones = '/api/devoluciones',
  Adeudos = '/api/adeudos',
  Categorias = '/api/categorias',
  Subcategorias = '/api/subcategorias',
  Dashboard = '/api/dashboard',
  Images = '/api/images',
  Importar = '/api/imports',
  Printer = '/api/printer',
  ImportarImagenes = '/api/imports/images',
  Marcas = '/api/marcas',
  ErrorReporting = '/api/error-reporting',
  PDF = '/api/pdf',
  Barcode = '/api/barcode',
  Descargables = '/api/descargables',
}

export const adminRoutes: IRoute[] = [
  {
    private: true,
    path: AdminRoutes.Dashboard,
    name: 'Dashboard',
    element: <DashboardPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  { private: true, path: AdminRoutes.Venta, name: 'Ventas', element: <VentasPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER] },
  {
    private: true,
    path: AdminRoutes.VentaProductos,
    name: 'Productos de venta',
    element: <ProductosVentaPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  { private: true, path: AdminRoutes.Proveedores, name: 'Provedores', element: <ProveedoresPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN] },
  {
    private: true,
    path: AdminRoutes.Productos,
    name: 'Productos',
    element: <ProductosPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  { private: true, path: AdminRoutes.Reportes, name: 'Reportes', element: <ReportesPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN] },
  { private: true, path: AdminRoutes.Ubicaciones, name: 'Ubicaciones', element: <UbicacionesPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN] },
  {
    private: true,
    path: AdminRoutes.Clientes,
    name: 'Clientes',
    element: <ClientesPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  {
    private: true,
    path: AdminRoutes.ImportarImagenes,
    name: 'Importar imágenes',
    element: <ImportImagesPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
  },
  { private: true, path: AdminRoutes.Importar, name: 'Importar', element: <ImportProductsPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN] },
  { private: true, path: AdminRoutes.Marcas, name: 'Marcas', element: <MarcaPage />, roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER] },
  {
    private: true,
    path: AdminRoutes.Categorias,
    name: 'Categorias',
    element: <CategoriaPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  {
    private: true,
    path: AdminRoutes.Subcategorias,
    name: 'Subcategorias',
    element: <SubcategoriaPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
  },
  { private: true, path: AdminRoutes.ErrorReporting, name: 'Reporte de errores', element: <ReportingPage />, roles: [RolesEnum.SUPERADMIN] },
  {
    private: true,
    path: AdminRoutes.Devoluciones,
    name: 'Devoluciones',
    element: <DevolucionesPage />,
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
  },
];
