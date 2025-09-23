import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceShowProductoImagen } from '@/Services/images/useServiceImages';

export const useGetImagen = (imagen: IImagenProducto | null) => {
  if (!imagen) return null;
  const { archivo, path } = imagen;
  const { isLoading, data } = useServiceShowProductoImagen(path, archivo);

  if (isLoading || !data) return null;

  return { image: URL.createObjectURL(data) };
};
