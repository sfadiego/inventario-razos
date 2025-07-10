import { IFilterItem } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export interface IFiltroProducto {
    proveedor_id?: number;
    categoria_id?: number;
}
export interface useProductosVentaPageProps {
    ventaId?: number;
}

export const useProductosVentaPage = ({ ventaId = 0 }: useProductosVentaPageProps) => {
    const { openModal, isOpen, closeModal } = useModal();
    const { isLoading, data } = useServiceShowVenta(ventaId);
    const ventaFinalizada = !isLoading && data?.status_venta == 'finalizada' ? true : false;
    const [selectedProduct, setselectedProduct] = useState(0);
    const [refetchCart, setRefetchCart] = useState<boolean>(false);
    const handleCloseModal = () => {
        closeModal();
        setselectedProduct(0);
    };

    const handleOpenModal = () => {
        openModal();
        setselectedProduct(0);
    };

    const renderersMap = {
        rowClassName: ({ stock, cantidad_minima }: IProducto): rowTypes | '' => {
            return cantidad_minima >= stock ? 'redRow' : '';
        },
        actions: ({ id, stock }: IProducto) =>
            stock > 0 &&
            !ventaFinalizada && (
                <Button
                    onClick={() => {
                        openModal();
                        setselectedProduct(id!);
                    }}
                    variant="primary"
                    size="sm"
                >
                    <Plus />
                </Button>
            ),
    };
    const filters: IFilterItem[] = [
        {
            property: 'nombre',
            operator: 'like',
            value: '',
        },
    ];

    const initialValues: IFiltroProducto = {
        proveedor_id: 0,
        categoria_id: 0,
    };

    return {
        openModal: handleOpenModal,
        isOpen,
        filters,
        closeModal: handleCloseModal,
        useServiceIndexProductos,
        renderersMap,
        initialValues,
        selectedProduct,
        refetchCart,
        setRefetchCart,
        venta: !isLoading && data ? data : null,
    };
};
