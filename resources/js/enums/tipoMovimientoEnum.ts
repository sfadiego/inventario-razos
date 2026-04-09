export enum TipoMovimientoEnum {
  Entrada = 1,
  Salida = 2,
  Ajuste = 3,
  Devolucion = 4,
  CancelandoDevolucion = 5,
}

export const TipoMovimientoEnumLabels: Record<TipoMovimientoEnum, string> = {
  [TipoMovimientoEnum.Entrada]: 'Entrada',
  [TipoMovimientoEnum.Salida]: 'Salida',
  [TipoMovimientoEnum.Ajuste]: 'Ajuste',
  [TipoMovimientoEnum.Devolucion]: 'Devolución',
  [TipoMovimientoEnum.CancelandoDevolucion]: 'Cancelando devolución',
};
