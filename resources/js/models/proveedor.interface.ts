import { ICategoria } from './categoria.interface';

export interface IProveedor {
  id?: number;
  nombre: string;
  observaciones?: string;
  categorias?: ICategoria[];
}
export interface IProveedorFormik {
  id?: number;
  nombre: string;
  observaciones?: string;
  categorias?: number[];
}
