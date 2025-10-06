import { useModal } from '@/hooks/useModal';
import { useServiceCountVentaProducto, useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useParams } from 'react-router';

export const useShoppingCartButton = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { id } = useParams();
  const ventaId = id !== undefined ? Number(id) : 0;
  const { isLoading, data, refetch } = useServiceCountVentaProducto(ventaId);
  const total = data?.total || 0;
  const disabled = !!(!isLoading || total == 0);
  const { refetch: refetchVenta } = useServiceShowVenta(ventaId);
  const handleCloseModal = () => {
    //aqui refrescar total producto ??
    closeModal();
    refetchVenta();
    refetch();
  };

  return { handleCloseModal, disabled, isOpen, openModal, total, ventaId };
};
