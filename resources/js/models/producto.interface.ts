export interface IProducto {
  nombre: string;
  proveedor_id: number;
  categoria_id: number;
  codigo: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  cantidad_minima: number;
  compatibilidad: string;
  ubicacion_id: number;
  activo: boolean;
}