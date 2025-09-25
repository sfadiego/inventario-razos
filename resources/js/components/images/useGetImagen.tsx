import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceShowProductoImagen } from '@/Services/images/useServiceImages';
import { useEffect, useState } from 'react';

export const useGetImagen = (imagen: IImagenProducto | null): { image: string | null } => {
  const [image, setimage] = useState<string | null>(null);

  const folder = imagen?.path ?? '';
  const name = imagen?.archivo ?? '';
  const { isLoading, data } = useServiceShowProductoImagen(folder, name);

  useEffect(() => {
    if (!isLoading && data) {
      setimage(URL.createObjectURL(data));
    }
  }, [isLoading, data]);

  return { image };
};
