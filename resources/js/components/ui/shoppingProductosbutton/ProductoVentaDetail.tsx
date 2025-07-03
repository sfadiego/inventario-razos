import { useDataTable } from '@/hooks/useDatatable';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { DataTable } from 'mantine-datatable';
import { Modal } from '../modal';
interface ProductoVentaDetailProps {
    isOpen: boolean;
    closeModal: () => void;
    ventaId: number;
}
export const ProductoVentaDetail = ({ isOpen, closeModal, ventaId = 0 }: ProductoVentaDetailProps) => {
    const { dataTableProps } = useDataTable({
        service: useServiceVentaProductoDetalle,
        payload: {
            serviceParamId: ventaId,
            filters: [],
        },
        renderersMap: {},
    });
    return (
        <Modal title={`Carrito de compras`} subtitle={`Productos de venta`} isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="grid grid-cols-12">
                <div className="col-span-12 h-9/10 overflow-auto">
                    <DataTable {...dataTableProps} />
                </div>
            </div>
        </Modal>
    );
};
