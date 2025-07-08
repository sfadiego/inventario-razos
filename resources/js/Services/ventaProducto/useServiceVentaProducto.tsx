import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi';
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps';
import { IVentaProducto } from '@/models/ventaProducto.interface';

const url = '/api/venta-producto';
const urlVenta = '/api/ventas';
export const useServiceVentaProductoDetalle = ({ serviceParamId, page = 1, limit = 10 }: IPaginateServiceProps) =>
    useGET<IVentaProducto>({
        url: `${urlVenta}/productos?venta_id=${serviceParamId}`,
        enable: !!serviceParamId,
        filters: {
            page,
            limit,
        },
    });
export const useServiceStoreVentaProducto = () => usePOST<IVentaProducto>({ url });
export const useServiceUpdateVentaProducto = (id?: number) => usePUT<IVentaProducto>({ url: `${url}/${id}` });
export const useServiceDeleteVentaProducto = (id: number) => useDELETE<IVentaProducto>({ url: `${url}/${id}` });
