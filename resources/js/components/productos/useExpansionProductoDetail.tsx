import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceBarcode } from '@/Services/barcode/useServiceBarcode';
import { useMemo, useState } from 'react';
import { useGetImagen } from '../images/useGetImagen';

export const useExpansionProductoDetail = ({ imagen = null, productoId }: { imagen: IImagenProducto | null; productoId: number }) => {
  const { image } = useGetImagen(imagen);
  const { isLoading, data } = useServiceBarcode(productoId);

  const [barcode, setBarcode] = useState<string | undefined>();
  useMemo(() => {
    if (!isLoading && data) {
      setBarcode(URL.createObjectURL(data));
    }
  }, [isLoading, data]);

  const downloadBarcode = () => window.open(barcode, 'download');

  return { image, barcode, downloadBarcode };
};
