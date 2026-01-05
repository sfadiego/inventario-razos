export enum TipoVentaEnum {
  CREDITO = 'credito',
  CONTADO = 'contado',
}

export type TipoVentaType = keyof typeof TipoVentaEnum;
