import { ICliente } from './cliente.interface';

export type TipoCompraType = 'credito' | 'contado';
export interface IVenta {
    id: number;
    venta_total: number;
    nombre_venta: string;
    folio: string;
    cliente_id: number | null;
    cliente?: ICliente;
    tipo_compra: TipoCompraType;
}
