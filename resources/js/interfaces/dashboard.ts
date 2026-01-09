import { IImagenProducto } from '@/models/imagenProducto.interface';

export interface IDashboardMasVendidos {
  producto: string;
  subcategoria: string;
  image?: IImagenProducto;
  cantidad: number;
}

export interface IDashboardMenosVendidos {
  producto: string;
  cantidad: number;
}

export interface IVentasItem {
  month: string;
  total: number;
  cantidad: number;
}

export interface IDashboardTotalVentas {
  total: number;
}
