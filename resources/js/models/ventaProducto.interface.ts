import { IProducto } from './producto.interface';

export interface IVentaProducto {
  id: number;
  cantidad: number;
  precio: number;
  producto_id: number;
  producto?: IProducto;
  venta_id: number;
  created_at?: string;
}

export interface IVentaProductoForm extends Omit<IVentaProducto, 'id'> {
  producto_nombre?: string;
  stock?: number;
}

export interface ICountVentaProducto {
  total: number;
}
