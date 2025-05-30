import { useGET, usePOST } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ICliente } from '@/models/cliente.interface';

const url = '/api/clientes';
export const useServiceIndexClientes = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<ICliente>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};

export const useServiceStoreCliente = () => usePOST({ url });
