import { useGET, usePOST } from '@/hooks/useApi';
import { IVentaProducto } from '@/models/ventaProducto.interface';

const url = '/api/venta-producto';
export const useServiceVentaProductoDetalle = (ventaId: number) => useGET<IVentaProducto>({ url: `${url}/${ventaId}/productos` });
export const useServiceStoreVentaProducto = () => usePOST<IVentaProducto>({ url });
