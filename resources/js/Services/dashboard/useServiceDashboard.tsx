import { useGET } from '@/hooks/useApi';
import { IDashboardMasVendidos, IDashboardMenosVendidos, IDashboardTotalVentas, IVentasItem } from '@/interfaces/dashboard';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Dashboard;
export const useServiceDashboardMasVendidos = (categoriaId?: number) => {
  return useGET<IDashboardMasVendidos[]>({ url: `${url}/mas-vendidos?${categoriaId ? `categoria_id=${categoriaId}` : ''}`, enable: !!categoriaId });
};

export const useServiceDashboardMenosVendidos = (categoriaId?: number) => {
  return useGET<IDashboardMenosVendidos[]>({ url: `${url}/menos-vendidos?${categoriaId ? `categoria_id=${categoriaId}` : ''}`, enable: !!categoriaId });
};

export const useServiceDashboardVentas = () => {
  return useGET<IVentasItem>({ url: `${url}/ventas` });
};

export const useServiceDashboardTotalVentas = ({ fecha = '' }: { fecha?: string }) =>
  useGET<IDashboardTotalVentas>({ url: `${url}/total-ventas?fecha=${fecha}` });
