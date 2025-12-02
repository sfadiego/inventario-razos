import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { ISubcategoria } from '@/models/subcategoria.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Categorias;
export const useServiceIndexSubCategorias = (params: { categoriaId: number } & IPaginateServiceProps) => {
  const { categoriaId, filters = [], search = null, page = 1, limit = 10 } = params;
  return useGET<IPaginate<ISubcategoria>>({
    url: `${url}/${categoriaId}/subcategorias`,
    filters: {
      filters,
      search,
      page,
      limit,
    },
  });
};

export const useServiceShowSubCategoria = (categoriaId: number, id: number) =>
  useGET<ISubcategoria>({ url: `${url}/${categoriaId}/subcategorias/${id}`, enable: !!id });

const urlSubcategoria = ApiRoutes.Subcategorias;
export const useServiceStoreSubCategorias = () => usePOST({ url: urlSubcategoria });
export const useServiceUpdateSubCategoria = (id: number) => usePUT({ url: `${urlSubcategoria}/${id}` });
export const useServiceDeleteSubCategoria = (id: number) => useDELETE({ url: `${urlSubcategoria}/${id}` });
