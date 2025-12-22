import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.PDF;
export const useServiceCatalogoProductosPdf = () => useGET<Blob>({ url: `${url}/catalogo-productos`, responseType: 'blob', enable: false });
export const useServiceReporteVentaPdf = (fechaInicio?: string, fechaFin?: string) =>
  useGET<Blob>({ url: `${url}/reporte-ventas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, responseType: 'blob', enable: false });
