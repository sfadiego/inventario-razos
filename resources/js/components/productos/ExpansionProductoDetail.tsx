import { IImagenProducto } from '@/models/imagenProducto.interface';
import { Image } from '../images/Image';
import { useGetImagen } from '../images/useGetImagen';

interface ExpansionProductoDetailProps {
  nombre: string;
  compatibilidad: string;
  imagen: IImagenProducto;
}

export const ExpansionProductoDetail = ({ nombre, compatibilidad, imagen }: ExpansionProductoDetailProps) => {
  const { image } = useGetImagen(imagen);

  return (
    <div className="grid grid-cols-12 px-8 pt-2">
      <div className="col-span-12">
        <h3 className="mb-1 text-lg font-bold">{nombre}</h3>
        <p className="mb-2">
          <span className="font-bold">Compatibilidad:</span> {compatibilidad || ' -- '}
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
