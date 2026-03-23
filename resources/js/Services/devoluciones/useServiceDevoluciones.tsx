import { useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginate } from '@/interfaces/IPaginate';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IDevolucion, IVentaDevoluciones } from '@/models/devolucion';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Devoluciones;
export const useServiceIndexDevoluciones = ({ filters = [], order = 'desc', search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IVentaDevoluciones>>({
    url,
    filters: {
      filters,
      search,
      page,
      limit,
      order,
    },
  });
};

export const useServiceShowDevolucion = (idDevolucion: number) => useGET<IDevolucion>({ url: `${url}/${idDevolucion}`, enable: !!idDevolucion });
export const useServiceShowDevolucionByVenta = (ventaId: number) =>
  useGET<IVentaDevoluciones>({ url: `${url}/by-venta/${ventaId}`, enable: !!ventaId });

export const useServiceStoreDevolucion = () => usePOST({ url });
export const useServiceUpdateDevolucion = (idDevolucion: number) => usePUT({ url: `${url}/${idDevolucion}` });
