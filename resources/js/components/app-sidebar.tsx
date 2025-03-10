import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CarFront, Folder, LayoutGrid, MapPinCheck, Shapes, Store, UserPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [

    {
        title: 'Clientes',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: UserPen,
    },
    {
        title: 'Ubicaciones',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: MapPinCheck,
    },
    {
        title: 'Proveedores',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Store,
    },
    {
        title: 'Productos',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: CarFront,
    },
    {
        title: 'Categorias',
        url: 'https://laravel.com/docs/starter-kits',
        icon: Shapes,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroupLabel>Administración</SidebarGroupLabel>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
