import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ICliente } from '@/models/cliente.interface';

const url = '/api/clientes';
export const useServiceIndexClientes = ({ filters = [], nameQuery = url, search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<ICliente>>({
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

export const useServiceStoreCliente = () => usePOST({ url });
export const useServiceShowCliente = (id?: number) => useGET<ICliente>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateCliente = (id?: number) => usePUT({ url: `${url}/${id}` });
