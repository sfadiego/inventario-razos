import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ICategoria } from '@/models/categoria.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Categorias;
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
export const useServiceShowCategoria = (id?: number) => useGET<ICategoria>({ url: `${url}/${id}`, enable: !!id });
export const useServiceUpdateCategoria = (id?: number) => usePUT({ url: `${url}/${id}` });
