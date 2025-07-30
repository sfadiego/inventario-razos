import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IProveedor } from '@/models/proveedor.interface';

const url = '/api/proveedores';
export const useServiceIndexProveedor = ({ filters = [], nameQuery = null, search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IProveedor>>({
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

export const useServiceStoreProveedor = () => usePOST({ url });
export const useServiceShowProveedor = (id?: number) => useGET<IProveedor>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateProveedor = (id?: number) => usePUT({ url: `${url}/${id}` });
