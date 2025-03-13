import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DashboardWidget } from '@/components/widgets/dashboard-widget';
import { WidgetProps } from '@/interfaces/WidgetProps';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categorias',
    href: '/admin/categorias',
  },
];


export default function Categorias() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="categorias" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">

        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>
    </AppLayout>
  );
}
