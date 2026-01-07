import { useGET } from '@/hooks/useApi';
import { ApiRoutes } from '@/router/modules/admin.routes';

const url = ApiRoutes.PDF;
export const useServiceCatalogoProductosPdf = (
  categoriaId: number = 0,
  printBarcode: number = 1,
  printImage: number = 1
) =>
  useGET<Blob>({
    url: `${url}/catalogo-productos?categoria_id=${categoriaId}&print_barcode=${printBarcode}&print_image=${printImage}`,
    responseType: 'blob',
    enable: false,
  });
export const useServiceReporteVentaPdf = (fechaInicio?: string, fechaFin?: string) =>
  useGET<Blob>({ url: `${url}/reporte-ventas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, responseType: 'blob', enable: false });
