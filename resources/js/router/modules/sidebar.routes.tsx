import { RolesEnum } from '@/enums/RolesEnum';
import { INavItem } from '@/interfaces/INavItem';
import {
  BadgeDollarSign,
  Banknote,
  BookCopy,
  CalendarSearch,
  CloudUpload,
  Cog,
  Coins,
  FileWarning,
  FolderSearch,
  Home,
  Image,
  ListChecks,
  UserSearch,
  Wrench,
} from 'lucide-react';
import { AdminRoutes } from './admin.routes';

export const adminSidebarRoutes: INavItem[] = [
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
    icon: <Coins />,
    name: 'Devoluciones',
    path: AdminRoutes.Devoluciones,
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
    icon: <CalendarSearch />,
    name: 'Movimientos',
    path: AdminRoutes.Reportes,
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
    icon: <ListChecks />,
    name: 'Catálogos',
    subItems: [
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
        icon: <Cog width={20} />,
        name: 'Productos',
        path: AdminRoutes.Productos,
      },
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
        icon: <FolderSearch width={20} />,
        name: 'Ubicaciones',
        path: AdminRoutes.Ubicaciones,
      },
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
        icon: <Wrench />,
        name: 'Marcas',
        path: AdminRoutes.Marcas,
      },
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
        icon: <BookCopy />,
        name: 'Categorias',
        path: AdminRoutes.Categorias,
      },
    ],
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
    icon: <BadgeDollarSign />,
    name: 'Proveedores',
    path: AdminRoutes.Proveedores,
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
    icon: <UserSearch />,
    name: 'Clientes',
    path: AdminRoutes.Clientes,
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
    icon: <CloudUpload />,
    name: 'Importar',
    subItems: [
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
        icon: <Cog width={20} />,
        name: 'Importar Productos',
        path: AdminRoutes.Importar,
      },
      {
        roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN],
        icon: <Image width={20} />,
        name: 'Importar Imagenes',
        path: AdminRoutes.ImportarImagenes,
      },
    ],
  },
  {
    roles: [RolesEnum.SUPERADMIN],
    icon: <FileWarning />,
    name: 'Reporte de errores',
    path: AdminRoutes.ErrorReporting,
  },
];

export const mainSidebarRoutes: INavItem[] = [
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
    icon: <Home />,
    name: 'Dashboard',
    path: AdminRoutes.Dashboard,
  },
  {
    roles: [RolesEnum.ADMIN, RolesEnum.SUPERADMIN, RolesEnum.USER],
    icon: <Banknote />,
    name: 'Ventas',
    path: AdminRoutes.Venta,
  },
];
