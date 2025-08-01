import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IProducto } from '@/models/producto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Productos;
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
export const useServiceUpdateProducto = (id?: number) => usePUT({ url: `${url}/${id}` });
export const useServiceStoreProducto = () => usePOST({ url });
