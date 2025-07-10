import { ICliente } from './cliente.interface';

export type TipoCompraType = 'credito' | 'contado';
export type StatusVenta = 'activa' | 'finalizada';
export interface IVenta {
    id: number;
    venta_total: number;
    nombre_venta: string;
    folio: string;
    cliente_id: number | null;
    cliente?: ICliente;
    tipo_compra: TipoCompraType;
    status_venta: StatusVenta;
}

export interface IVentaUpdateProps {
    nombre_venta?: string;
    cliente_id?: number | null;
    tipo_compra?: TipoCompraType;
    status_venta?: StatusVenta;
}
