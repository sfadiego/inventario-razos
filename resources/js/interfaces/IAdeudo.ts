export interface IVentaAdeudo {
  id: number;
  folio: string;
  nombre_venta: string;
  created_at: string;
}

export interface IAdeudo {
  id: number;
  total_adeudo: number;
  venta_id: number;
  venta: IVentaAdeudo;
  created_at: string;
}
