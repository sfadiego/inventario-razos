import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IReporteMovimiento } from '@/models/reporteMovimiento.interface';

const url = '/api/reporte-movimientos';
export const useServiceIndexReporteMovimiento = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IReporteMovimiento>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};

export const useServiceShowReporteMovimiento = (id?: number) => useGET<IReporteMovimiento>({ url: `${url}/${id}`, enable: !!id });
