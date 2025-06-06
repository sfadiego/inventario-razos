export interface IVentaProducto {
    id: number;
    cantidad: number;
    precio: number;
    producto_id: number;
    venta_id: number;
    created_at?: string;
}
