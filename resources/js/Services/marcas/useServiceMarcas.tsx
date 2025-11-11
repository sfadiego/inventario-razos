import { useGET, usePOST } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IMarca } from '@/models/marca.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Marcas;
export const useServiceIndexMarcas = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IMarca>>({
    url,
    filters: {
      filters,
      search,
      page,
      limit,
    },
  });
};

export const useServiceShowMarca = (id?: number) => useGET<IMarca>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateMarca = (id?: number) => usePOST<IMarca>({ url: `${url}/${id}` });
export const useServiceStoreMarca = () => usePOST<IMarca>({ url });
