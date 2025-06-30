export interface IVentaProducto {
    id: number;
    cantidad: number;
    precio: number;
    producto_id: number;
    venta_id: number;
    created_at?: string;
}

export interface IVentaProductoForm extends Omit<IVentaProducto, 'id'> {
    producto_nombre?: string;
}

export interface ICountVentaProducto {
    total: number;
}
