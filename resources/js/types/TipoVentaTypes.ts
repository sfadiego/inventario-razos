export enum TipoVentaEnum {
  CREDITO = 'credito',
  CONTADO = 'contado',
}

export type TipoVentaType = (typeof TipoVentaEnum)[keyof typeof TipoVentaEnum];
