export type TipoCompraType = 'credito' | 'contado';
export interface IVenta {
    id: number;
    venta_total: number;
    nombre_venta: string;
    folio: string;
    cliente_id: number | null;
    tipo_compra: TipoCompraType;
}
