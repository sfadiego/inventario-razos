import { useModal } from '@/hooks/useModal';
import { useCallback, useState } from 'react';

export const useProductoVentaModal = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const [productId, setProductId] = useState<number>(0);

  const show = useCallback(
    (id: number) => {
      setProductId(id);
      openModal();
    },
    [openModal],
  );

  const hide = useCallback(() => {
    setProductId(0);
    closeModal();
  }, [closeModal]);

  return { isOpen, productId, show, hide };
};
