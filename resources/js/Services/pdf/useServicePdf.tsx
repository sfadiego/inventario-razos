import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.PDF;
export const useServiceCatalogoProductosPdf = (categoriaId: number = 0, printBarcode: number = 1, printImage: number = 1) =>
  useGET<Blob>({
    url: `${url}/catalogo-productos?categoria_id=${categoriaId}&print_barcode=${printBarcode}&print_image=${printImage}`,
    responseType: 'blob',
    enable: false,
  });
export const useServiceReporteVentaPdf = (date: string) =>
  useGET<Blob>({
    url: `${url}/reporte-ventas?fecha_inicio=${date}`,
    responseType: 'blob',
    enable: false,
  });
