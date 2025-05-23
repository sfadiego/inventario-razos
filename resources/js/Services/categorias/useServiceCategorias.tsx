import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';

interface ICategorias {
    id: number;
    nombre: string;
    activa: boolean;
}

const url = '/api/categorias';
export const useServiceIndexCategorias = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<ICategorias>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};
