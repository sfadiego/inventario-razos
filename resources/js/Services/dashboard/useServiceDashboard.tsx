import { useGET } from '@/hooks/useApi';
import { IDashboardMasVendidos, IDashboardMenosVendidos, IDashboardTotalVentas, IVentasItem } from '@/interfaces/dashboard';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.Dashboard;
export const useServiceDashboardMasVendidos = () => {
  return useGET<IDashboardMasVendidos[]>({ url: `${url}/mas-vendidos` });
};

export const useServiceDashboardMenosVendidos = () => {
  return useGET<IDashboardMenosVendidos[]>({ url: `${url}/menos-vendidos` });
};

export const useServiceDashboardVentas = () => {
  return useGET<IVentasItem>({ url: `${url}/ventas` });
};

export const useServiceDashboardTotalVentas = ({ fecha = '' }: { fecha?: string }) =>
  useGET<IDashboardTotalVentas>({ url: `${url}/total-ventas?fecha=${fecha}` });
