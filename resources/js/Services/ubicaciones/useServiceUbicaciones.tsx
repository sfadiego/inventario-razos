import { useGET } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IUbicacion } from '@/models/ubicacion.interface';


const url = '/api/ubicaciones';
export const useServiceIndexUbicaciones = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IUbicacion>>({
        url,
        filters: {
            filters,
            search,
            page,
            limit,
        },
    });
};
