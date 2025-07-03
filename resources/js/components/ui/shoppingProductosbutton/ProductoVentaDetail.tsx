import { DataTable } from 'mantine-datatable';
import { Modal } from '../modal';
import { useProductoVentaDetail } from './useProductoVentaDetail';
interface ProductoVentaDetailProps {
    isOpen: boolean;
    closeModal: () => void;
    ventaId: number;
}

export const ProductoVentaDetail = ({ isOpen, closeModal, ventaId = 0 }: ProductoVentaDetailProps) => {
    const { dataTableProps } = useProductoVentaDetail(ventaId);
    return (
        <Modal title={`Carrito de compras`} subtitle={`Productos de venta`} isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="grid grid-cols-12">
                <div className="col-span-12"></div>
                <div className="col-span-12 h-9/10 overflow-auto">
                    <DataTable {...dataTableProps} />
                </div>
            </div>
        </Modal>
    );
};
