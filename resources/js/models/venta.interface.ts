export type TipoCompraType = 'credito' | 'contado';
export interface IVenta {
    id: number;
    venta_total: number;
    nombre_venta: string;
    cliente_id: number;
    tipo_compra: TipoCompraType;
}
