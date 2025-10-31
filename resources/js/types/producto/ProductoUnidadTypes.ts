export type ProductoUnidadTypes = 'pieza' | 'metro' | 'par';

const unidadPlural = {
  pieza: 'Piezas',
  metro: 'Metros',
  par: 'Pares',
};
export const unidadPluralMap = (unidad: ProductoUnidadTypes) => unidadPlural[unidad];
