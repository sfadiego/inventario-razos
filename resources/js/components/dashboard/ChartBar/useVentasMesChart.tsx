import { IVentasItem } from '@/interfaces/dashboard';
import { useServiceDashboardVentas } from '@/Services/dashboard/useServiceDashboard';
import { useMemo } from 'react';

export const useVentasMesChart = () => {
    const { isLoading, data } = useServiceDashboardVentas();
    const { months, total, cantidad } = useMemo(() => {
        if (isLoading || !Array.isArray(data)) {
            return {
                months: [],
                total: [],
                cantidad: [],
            };
        }

        type Accumulator = { months: string[]; total: number[]; cantidad: number[] };
        return data.reduce(
            (acc: Accumulator, item: IVentasItem) => {
                acc.months.push(item.month);
                acc.total.push(item.total);
                acc.cantidad.push(item.cantidad);
                return acc;
            },
            { months: [], total: [], cantidad: [] },
        );
    }, [isLoading, data]);

    return {
        months,
        total,
        cantidad,
    };
};
