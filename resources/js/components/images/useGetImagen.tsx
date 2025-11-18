import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceShowProductoImagen } from '@/Services/images/useServiceImages';
import { useEffect, useRef, useState } from 'react';

export const useGetImagen = (imagenObject: IImagenProducto | null): { image: string | null } => {
  const [image, setImage] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const folder = imagenObject?.path ?? '';
  const name = imagenObject?.archivo ?? '';
  const external = imagenObject?.external ?? false;
  const { isLoading, data } = useServiceShowProductoImagen(folder, name);

  const cleanupObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(() => {
    return () => cleanupObjectUrl();
  }, []);

  useEffect(() => {
    if (!imagenObject?.archivo) {
      cleanupObjectUrl();
      setImage(null);
      return;
    }

    if (imagenObject?.external && /^https?:\/\//i.test(imagenObject.archivo)) {
      cleanupObjectUrl();
      setImage(imagenObject.archivo);
      return;
    }

    if (data instanceof Blob) {
      cleanupObjectUrl();
      const url = URL.createObjectURL(data);
      objectUrlRef.current = url;
      setImage(url);
      return;
    }

    cleanupObjectUrl();
    setImage(null);
  }, [isLoading, data, folder, name, external, imagenObject]);

  return { image };
};
