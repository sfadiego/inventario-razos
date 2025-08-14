import { useServiceDashboardMasVendidos, useServiceDashboardTotalVentas } from '@/Services/dashboard/useServiceDashboard';
import { Cog, HandCoins } from 'lucide-react';
import { DashboardSingleCard } from './SingleCard/DashboardSingleCard';

export default function EcommerceMetrics() {
    const { isLoading: isLoadingTotal, data: dataTotal } = useServiceDashboardTotalVentas({});
    const { isLoading: isLoadingMasVendido, data: dataMasVendido } = useServiceDashboardMasVendidos();

    const total = !isLoadingTotal && dataTotal?.total ? dataTotal.total : 0;
    const item = !isLoadingMasVendido && dataMasVendido?.length ? dataMasVendido[0] : { producto: '', cantidad: 0 };
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <DashboardSingleCard title="Ventas del mes" ammount={`$${total} MX`} IconComponent={HandCoins}></DashboardSingleCard>
            <DashboardSingleCard
                badgeNumber={`${item.cantidad} pz`}
                title="Mas vendido"
                ammount={item.producto}
                IconComponent={Cog}
            ></DashboardSingleCard>
        </div>
    );
}
