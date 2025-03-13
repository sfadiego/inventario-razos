import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DashboardWidget } from '@/components/widgets/dashboard-widget';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const widgets = [
    {
        title: 'Venta del dia',
        value: '$123'
    },
    {
        title: 'Producto mas Vendido',
        value: 'Producto 1'
    },
    {
        title: 'Producto menos Vendido',
        value: 'Producto 2'
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {
                        widgets.map((widget, index) => {
                            return (
                                <DashboardWidget key={index}
                                    title={widget.title}
                                    value={widget.value} />
                            );
                        })
                    }
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
