import { useModal } from '@/hooks/useModal';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router';
import Button from '../button/Button';
import { ProductoVentaDetail } from './ProductoVentaDetail';

export default function ShoppingCartButton() {
    const { id } = useParams();
    const { isOpen, openModal, closeModal } = useModal();
    const ventaId = id !== undefined ? Number(id) : undefined;
    const { isLoading, data } = useServiceCountVentaProducto(ventaId);
    const total = data?.total || 0;
    return (
        <>
            <div className="relative">
                <Button disabled={isLoading} variant={'outline'} onClick={openModal}>
                    <ShoppingCart />
                    <div className="dark:text-gray top-0.5 right-0 z-10 h-5 w-5 rounded-full bg-orange-400 text-sm text-white">{total}</div>
                </Button>
            </div>
            <ProductoVentaDetail isOpen={isOpen} closeModal={closeModal} />
        </>
    );
}
