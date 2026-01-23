import { Image } from '@/components/images/Image';
import { useGetImagen } from '@/components/images/useGetImagen';
import { IImagenProducto } from '@/models/imagenProducto.interface';
import { useServiceDashboardMasVendidos } from '@/Services/dashboard/useServiceDashboard';

export const useBestSellerList = (categoriaId?: number) => {
  const { isLoading, data } = useServiceDashboardMasVendidos(categoriaId);
  return {
    isLoading,
    data,
  };
};

export const BestSellerProductImage = ({ image }: { image: IImagenProducto }) => {
  const { image: imgSrc } = useGetImagen(image);
  return imgSrc ? <Image image={imgSrc} /> : null;
};
