import { Modal } from '../modal';
interface ProductoVentaDetailProps {
    isOpen: boolean;
    closeModal: () => void;
}
export const ProductoVentaDetail = ({ isOpen, closeModal }: ProductoVentaDetailProps) => {
    return (
        <Modal title={`Carrito de compras`} subtitle={`Productos de venta`} isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <></>
        </Modal>
    );
};
