import { StatusVentaType } from '@/types/statusVentaTypes';
import { TipoCompraType } from '@/types/TipoVentaTypes';
import { ICliente } from './cliente.interface';

export interface IVenta {
  id: number;
  venta_total: number;
  nombre_venta: string;
  folio: string;
  cliente_id: number | null;
  cliente?: ICliente;
  tipo_compra: TipoCompraType;
  status_venta: StatusVentaType;
}

export interface IVentaUpdateProps {
  nombre_venta?: string;
  cliente_id?: number | null;
  tipo_compra?: TipoCompraType;
  status_venta?: StatusVentaType;
}
