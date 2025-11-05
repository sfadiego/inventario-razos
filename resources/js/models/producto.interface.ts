import { ProductoUnidadTypes } from '@/types/producto/ProductoUnidadTypes';
import { ICategoria } from './categoria.interface';
import { IImagenProducto } from './imagenProducto.interface';
import { IProveedor } from './proveedor.interface';
import { IUbicacion } from './ubicacion.interface';
import { IMarca } from './marca.interface';

export interface IProducto {
  id?: number;
  nombre: string;
  proveedor_id: number;
  categoria_id: number;
  codigo?: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  cantidad_minima: number;
  compatibilidad: string;
  ubicacion_id: number;
  activo: boolean;
  proveedor?: IProveedor;
  categoria?: ICategoria;
  ubicacion?: IUbicacion;
  imagen_id?: number;
  imagen?: IImagenProducto;
  marca?: IMarca;
  marca_id: number;
  unidad: ProductoUnidadTypes;
}
