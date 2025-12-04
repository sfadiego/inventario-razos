import { ICategoria } from './categoria.interface';

export interface ISubcategoria {
  id?: number;
  nombre: string;
  categoria_id: number;
  categoria?: ICategoria;
}

export interface ISubcategoriaForm {
  nombre: string;
  categoria_id: number;
}
