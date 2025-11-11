import { INavItem } from '@/interfaces/INavItem';
import { BadgeDollarSign, Banknote, BookOpenText, Cog, File, FileWarning, FolderSearch, Home, ListChecks, UserSearch, Wrench } from 'lucide-react';
import { AdminRoutes } from './admin.routes';
export const adminSidebarRoutes: INavItem[] = [
  {
    icon: <BookOpenText />,
    name: 'Reportes',
    path: AdminRoutes.Reportes,
  },
  {
    icon: <ListChecks />,
    name: 'Catalogos',
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
    ],
  },
  {
    icon: <BadgeDollarSign />,
    name: 'Proveedores',
    path: AdminRoutes.Proveedores,
  },
  {
    icon: <File />,
    name: 'Importar',
    path: AdminRoutes.Importar,
  },
  {
    icon: <UserSearch />,
    name: 'Clientes',
    path: AdminRoutes.Clientes,
  },
  {
    icon: <FileWarning />,
    name: 'Error Reporting',
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
