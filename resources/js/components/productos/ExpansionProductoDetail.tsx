import { IProducto } from '@/models/producto.interface';
import { unidadPluralMap } from '@/types/producto/ProductoUnidadTypes';
import { Image } from '../images/Image';
import { useGetImagen } from '../images/useGetImagen';

interface ExpansionProductoDetailProps {
  record: IProducto;
}

export const ExpansionProductoDetail = ({ record }: ExpansionProductoDetailProps) => {
  const { nombre, compatibilidad, imagen, unidad, stock, marca, precio_venta } = record;
  const { image } = useGetImagen(imagen ?? null);
  return (
    <div className="grid grid-cols-12 px-8 pt-2">
      <div className="col-span-12">
        <h3 className="mb-1 text-lg font-bold">{nombre}</h3>
        <p className="mb-2">
          <span className="font-bold">Compatibilidad:</span> {compatibilidad || ' -- '}
        </p>
        <p className="mb-2">
          <span className="font-bold">Marca:</span> {marca?.nombre || ' -- '}
        </p>
        <p className="mb-2">
          <span className="font-bold">Precio venta p/{unidadPluralMap(unidad).toLowerCase()}:</span> {precio_venta || ' -- '}
        </p>
        <p className="mb-2">
          <span className="font-bold">Stock:</span> {stock} {stock > 1 ? unidadPluralMap(unidad) : unidad}
        </p>
      </div>
      {image && (
        <div className="col-span-12 my-2">
          <Image image={image} />
        </div>
      )}
    </div>
  );
};
