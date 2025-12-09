import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.PDF;
export const useServiceCatalogoProductosPdf = () => useGET<Blob>({ url: `${url}/catalogo-productos`, responseType: 'blob', enable: false });
export const useServiceReporteVentaPdf = () => useGET<Blob>({ url: `${url}/reporte-ventas`, responseType: 'blob', enable: false });
