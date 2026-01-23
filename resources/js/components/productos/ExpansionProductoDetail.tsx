import { IProducto } from '@/models/producto.interface';
import { unidadPluralMap } from '@/types/producto/ProductoUnidadTypes';
import { Link } from 'react-router';
import { Image } from '../images/Image';
import { useExpansionProductoDetail } from './useExpansionProductoDetail';

interface ExpansionProductoDetailProps {
  record: IProducto;
}

export const ExpansionProductoDetail = ({ record }: ExpansionProductoDetailProps) => {
  const { nombre, compatibilidad, imagen, unidad, stock, marca, precio_venta, id } = record;
  const { image, barcode, downloadBarcode } = useExpansionProductoDetail({ imagen: imagen ?? null, productoId: id || 0 });
  return (
    <div className="grid grid-cols-12 px-8 pt-2">
      <div className="col-span-12 sm:col-span-6">
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
        {barcode && (
          <p className="mb-2">
            <Image disabledWidth image={barcode} />
            <Link to={`#`} onClick={downloadBarcode}>
              Descargar
            </Link>
          </p>
        )}
      </div>
      {image && (
        <div className="col-span-12 mb-2 sm:col-span-6">
          <Image image={image} />
        </div>
      )}
    </div>
  );
};
