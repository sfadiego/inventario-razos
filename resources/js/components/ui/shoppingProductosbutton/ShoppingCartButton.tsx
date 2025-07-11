import { ShoppingCart } from 'lucide-react';
import { useParams } from 'react-router';
import Button from '../button/Button';
import { useShoppingCartButton } from './partials/useShoppingCartButton';
import { ProductoVentaDetail } from './ProductoVentaDetail';

export default function ShoppingCartButton({ refetchNumber = false }: { refetchNumber?: boolean }) {
    const { id } = useParams();
    const ventaId = id !== undefined ? Number(id) : 0;
    const { openModal, total, isOpen, handleCloseModal } = useShoppingCartButton({ ventaId, refetchNumber });

    return (
        <>
            <div className="relative">
                <Button variant={'outline'} onClick={openModal}>
                    <ShoppingCart />
                    <div className="dark:text-gray top-0.5 right-0 z-10 h-5 w-5 rounded-full bg-orange-400 text-sm text-white">{total}</div>
                </Button>
            </div>
            {isOpen && <ProductoVentaDetail isOpen={isOpen} ventaId={ventaId} closeModal={handleCloseModal} />}
        </>
    );
}
