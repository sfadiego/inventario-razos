import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IVenta } from '@/models/venta.interface';

const url = '/api/ventas';
export const useServiceIndexVenta = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IVenta>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};

export const useServiceStoreVenta = () => usePOST({ url });
export const useServiceShowVenta = (id?: number) => useGET<IVenta>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateVenta = (id?: number) => usePUT({ url: `${url}/${id}` });
