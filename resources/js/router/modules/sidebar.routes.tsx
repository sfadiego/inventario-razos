import { INavItem } from '@/interfaces/INavItem';
import { BadgeDollarSign, Banknote, BookOpenText, Cog, FolderSearch, Home, ListChecks, UserSearch } from 'lucide-react';
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
        path: AdminRoutes.Catalogos,
        subItems: [
            {
                icon: <Cog width={20} />,
                name: 'Productos',
                path: AdminRoutes.Productos,
            },
            {
                icon: <FolderSearch width={20}/>,
                name: 'Ubicaciones',
                path: AdminRoutes.Ubicaciones,
            },
        ],
    },
    {
        icon: <BadgeDollarSign />,
        name: 'Proveedores',
        path: AdminRoutes.Proovedores,
    },
    {
        icon: <UserSearch />,
        name: 'Clientes',
        path: AdminRoutes.Clientes,
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
