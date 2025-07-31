import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IVenta } from '@/models/venta.interface';
import { ICountVentaProducto } from '@/models/ventaProducto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Venta;
export const useServiceIndexVenta = ({ filters = [],  search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
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
export const useServiceFinalizarVenta = (id?: number) => usePUT({ url: `${url}/${id}/finalizar-venta` });

export const useServiceCountVentaProducto = (id?: number) => useGET<ICountVentaProducto>({ url: `${url}/${id}/count-productos`, enable: !!id });
