import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ITipoMovimiento } from '@/models/tipoMovimiento.interface';

const url = '/api/tipo-movimientos';
export const useServiceIndexTipoMovimiento = ({ filters = [], nameQuery = null, search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<ITipoMovimiento>>({
        url,
        nameQuery,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};
