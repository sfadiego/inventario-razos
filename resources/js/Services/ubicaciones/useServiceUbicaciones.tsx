import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IUbicacion } from '@/models/ubicacion.interface';

const url = '/api/ubicaciones';
export const useServiceIndexUbicaciones = ({ filters = [], nameQuery = null, search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
    return useGET<IPaginate<IUbicacion>>({
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

export const useServiceStoreUbicacion = () => usePOST({ url });
export const useServiceShowUbicacion = (id?: number) => useGET<IUbicacion>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateUbicacion = (id?: number) => usePUT({ url: `${url}/${id}` });
