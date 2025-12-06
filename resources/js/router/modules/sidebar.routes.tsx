import { INavItem } from '@/interfaces/INavItem';
import {
  BadgeDollarSign,
  Banknote,
  BookCopy,
  CalendarSearch,
  CloudUpload,
  Cog,
  FileWarning,
  FolderSearch,
  Home,
  ListChecks,
  UserSearch,
  Wrench,
} from 'lucide-react';
import { AdminRoutes } from './admin.routes';
export const adminSidebarRoutes: INavItem[] = [
  {
    icon: <CalendarSearch />,
    name: 'Movimientos',
    path: AdminRoutes.Reportes,
  },
  {
    icon: <ListChecks />,
    name: 'Catálogos',
    subItems: [
      {
        icon: <Cog width={20} />,
        name: 'Productos',
        path: AdminRoutes.Productos,
      },
      {
        icon: <FolderSearch width={20} />,
        name: 'Ubicaciones',
        path: AdminRoutes.Ubicaciones,
      },
      {
        icon: <Wrench />,
        name: 'Marcas',
        path: AdminRoutes.Marcas,
      },
      {
        icon: <BookCopy />,
        name: 'Categorias',
        path: AdminRoutes.Categorias,
      },
    ],
  },
  {
    icon: <BadgeDollarSign />,
    name: 'Proveedores',
    path: AdminRoutes.Proveedores,
  },
  {
    icon: <UserSearch />,
    name: 'Clientes',
    path: AdminRoutes.Clientes,
  },
  {
    icon: <CloudUpload />,
    name: 'Importar Productos',
    path: AdminRoutes.Importar,
  },
  {
    icon: <FileWarning />,
    name: 'Reporte de errores',
    path: AdminRoutes.ErrorReporting,
  },
];

export const mainSidebarRoutes: INavItem[] = [
  {
    icon: <Home />,
    name: 'Dashboard',
    path: AdminRoutes.Dashboard,
  },
  {
    icon: <Banknote />,
    name: 'Ventas',
    path: AdminRoutes.Venta,
  },
];
