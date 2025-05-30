import { useGET, usePOST } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ICategoria } from '@/models/categoria.interface';

const url = '/api/categorias';
export const useServiceIndexCategorias = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<ICategoria>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};

export const useServiceStoreCategorias = () => usePOST({ url });
