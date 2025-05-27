import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IProveedor } from '@/models/proveedor.interface';


const url = '/api/proveedores';
export const useServiceIndexProveedor = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IProveedor>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};
