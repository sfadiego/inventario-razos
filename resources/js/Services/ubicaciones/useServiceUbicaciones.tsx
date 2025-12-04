import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IUbicacion } from '@/models/ubicacion.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Ubicaciones;
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

export const useServiceStoreUbicacion = () => usePOST({ url });
export const useServiceShowUbicacion = (id?: number) => useGET<IUbicacion>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateUbicacion = (id?: number) => usePUT({ url: `${url}/${id}` });
export const useServiceDeleteUbicacion = (id: number) => useDELETE({ url: `${url}/${id}` });
