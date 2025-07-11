import { Printer, ShoppingCart } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import Button from '../button/Button';
import { ButtonTypeEnum } from '../button/enums/buttonType.enum';
import { Modal } from '../modal';
import { useProductoVentaDetail } from './useProductoVentaDetail';
interface ProductoVentaDetailProps {
    isOpen: boolean;
    closeModal: () => void;
    ventaId: number;
}

export const ProductoVentaDetail = ({ isOpen, closeModal, ventaId = 0 }: ProductoVentaDetailProps) => {
    const { dataTableProps, onSubmitFinalizarVenta, disabled } = useProductoVentaDetail({ ventaId, closeModal });
    return (
        <Modal title={`Carrito de compras`} subtitle={`Productos de venta`} isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="grid grid-cols-12">
                <div className="col-span-12 overflow-auto">
                    <DataTable {...dataTableProps} />
                </div>
                <div className="col-span-12 mt-3 flex justify-end gap-2">
                    <Button onClick={() => null} size="md" type={ButtonTypeEnum.Button} disabled={disabled} className="col-span-12 md:col-span-6">
                        <Printer />
                        Imprimir Ticket
                    </Button>
                    <Button
                        onClick={() => onSubmitFinalizarVenta({ status_venta: 'finalizada' }, {})}
                        size="md"
                        type={ButtonTypeEnum.Button}
                        disabled={disabled}
                        className="col-span-12 md:col-span-6"
                    >
                        <ShoppingCart />
                        Confirmar Venta
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
