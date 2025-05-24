import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';

interface IProducto {
    id: number;
    nombre: string;
    activa: boolean;
}

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
