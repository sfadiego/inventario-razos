import { ICliente } from './cliente.interface';

export interface IDevolucion {
  total_reembolsado: number;
  motivo: string;
  venta_id: number;
}

export interface IDevolucionDetalle {
  id: number;
  cantidad: number;
  precio_unitario: number;
  devolucion_id: number;
  producto_id: number;
  created_at: string;
  updated_at: string;
}

export interface IDevolucionProducto {
  producto_id: number;
  nombre: string;
  unidad?: string;
  cantidad: number;
  precio_unitario: number;
}
export interface IDevolucionRequest {
  venta_id: number;
  motivo: string;
  productos: IDevolucionProducto[] | [];
}

export interface IVentaDevoluciones {
  id: number;
  venta_total: string;
  nombre_venta: string;
  folio: string;
  tipo_compra: string;
  status_venta: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  cliente_id?: number;
  cliente: ICliente;
  tieneDevolucion: boolean;
}
