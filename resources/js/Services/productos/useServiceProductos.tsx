import { useGET, usePOST } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IProducto } from '@/models/producto.interface';

const url = '/api/productos';
export const useServiceIndexProductos = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IProducto>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};

export const useServiceShowProducto = (id?: number) => useGET<IProducto>({ url: `${url}/${id}`, enable: !!id });
export const useServiceStoreProducto = () => usePOST({ url });
