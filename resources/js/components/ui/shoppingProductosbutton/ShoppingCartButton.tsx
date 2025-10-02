import { ShoppingCart } from 'lucide-react';
import Button from '../button/Button';
import { useShoppingCartButton } from './partials/useShoppingCartButton';
import { ProductoVentaDetail } from './ProductoVentaDetail';

export default function ShoppingCartButton() {
  const { openModal, total, isOpen, handleCloseModal } = useShoppingCartButton();

  return (
    <>
      <div className="relative">
        <Button variant={'outline'} onClick={openModal}>
          <ShoppingCart />
          <div className="dark:text-gray top-0.5 right-0 z-10 h-5 w-5 rounded-full bg-orange-400 text-sm text-white">{total}</div>
        </Button>
      </div>
      {isOpen && <ProductoVentaDetail isOpen={isOpen} closeModal={handleCloseModal} />}
    </>
  );
}
