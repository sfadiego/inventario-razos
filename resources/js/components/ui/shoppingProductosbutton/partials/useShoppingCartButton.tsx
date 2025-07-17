import { useModal } from '@/hooks/useModal';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { useEffect } from 'react';
interface useShoppingCartButtonProps {
    ventaId?: number;
    refetchNumber: boolean;
}
export const useShoppingCartButton = ({ ventaId, refetchNumber }: useShoppingCartButtonProps) => {
    const { isOpen, openModal, closeModal } = useModal();
    const { isLoading, data, refetch } = useServiceCountVentaProducto(ventaId);
    const total = data?.total || 0;
    const disabled = !!(!isLoading || total == 0);
    useEffect(() => {
        refetch();
    }, [refetchNumber, refetch]);

    const handleCloseModal = () => {
        closeModal();
        refetch();
    };

    return { handleCloseModal, disabled, isOpen, openModal, total };
};
