import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export interface IFiltroProducto {
    proveedor_id?: number;
    categoria_id?: number;
}
export const useProductosVentaPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const [selectedProduct, setselectedProduct] = useState(0);
    const handleCloseModal = () => {
        closeModal();
        setselectedProduct(0);
    };

    const handleOpenModal = () => {
        openModal();
        setselectedProduct(0);
    };

    const renderersMap = {
        actions: ({ id }: IProducto) => (
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
    };
};
