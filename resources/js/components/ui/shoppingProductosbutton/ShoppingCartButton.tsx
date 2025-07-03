import { useModal } from '@/hooks/useModal';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '../button/Button';
import { ProductoVentaDetail } from './ProductoVentaDetail';

export default function ShoppingCartButton({ refetchNumber }: { refetchNumber?: boolean }) {
    const { id } = useParams();
    const { isOpen, openModal, closeModal } = useModal();
    const ventaId = id !== undefined ? Number(id) : 0;
    const { isLoading, data, refetch } = useServiceCountVentaProducto(ventaId);
    const total = data?.total || 0;
    useEffect(() => {
        refetch();
    }, [refetchNumber, refetch]);

    return (
        <>
            <div className="relative">
                <Button disabled={isLoading} variant={'outline'} onClick={openModal}>
                    <ShoppingCart />
                    <div className="dark:text-gray top-0.5 right-0 z-10 h-5 w-5 rounded-full bg-orange-400 text-sm text-white">{total}</div>
                </Button>
            </div>
            <ProductoVentaDetail isOpen={isOpen} ventaId={ventaId} closeModal={closeModal} />
        </>
    );
}
