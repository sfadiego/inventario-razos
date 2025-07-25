import { useModal } from '@/hooks/useModal';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { useParams } from 'react-router';

export const useShoppingCartButton = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { id } = useParams();
    const ventaId = id !== undefined ? Number(id) : 0;
    const { isLoading, data, refetch } = useServiceCountVentaProducto(ventaId);
    const total = data?.total || 0;
    const disabled = !!(!isLoading || total == 0);

    const handleCloseModal = () => {
        closeModal();
        refetch();
    };

    return { handleCloseModal, disabled, isOpen, openModal, total, ventaId };
};
