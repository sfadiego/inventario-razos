import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceShowProductoImagen } from '@/Services/images/useServiceImages';

interface ExpansionProductoDetailProps {
  nombre: string;
  compatibilidad: string;
  imagen?: IImagenProducto;
}

export const getImagen = (imagen: IImagenProducto | null) => {
  if (!imagen) return null;
  const { archivo, path } = imagen;
  const { isLoading, data } = useServiceShowProductoImagen(path, archivo);

  if (isLoading || !data) return null;

  return { image: URL.createObjectURL(data) };
};

export const ExpansionProductoDetail = ({ nombre, compatibilidad, imagen }: ExpansionProductoDetailProps) => {
  const result = getImagen(imagen ?? null);
  const image = result?.image;
  return (
    <div className="grid grid-cols-12 px-8 pt-2">
      <div className="col-span-12">
        <h3 className="mb-1 text-lg font-bold">{nombre}</h3>
        <p className="mb-2">
          <span className="font-bold">Compatibilidad:</span> {compatibilidad || ' -- '}
        </p>
      </div>
      <div className="col-span-12">
        {image && (
          <div className="p-2">
            <img src={image} alt="Cover" className="w-[100px] rounded-xl border border-gray-200 dark:border-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
};
