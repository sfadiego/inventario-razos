import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos, useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProductoStore } from './partials/useProductoStore';

export interface IFiltroProducto {
    proveedor_id?: number;
    categoria_id?: number;
}

export const useProductosPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const [selectedProduct, setselectedProduct] = useState(0);
    const { isLoading, data } = useServiceShowProducto(selectedProduct);
    const { setSelectedProducto, refreshTableFlag } = useProductoStore();
    const handleCloseModal = () => {
        closeModal();
        setselectedProduct(0);
        setSelectedProducto(null);
    };

    const handleOpenModal = () => {
        openModal();
        setselectedProduct(0);
        setSelectedProducto(null);
    };

    useEffect(() => {
        if (!isLoading && data && selectedProduct) {
            setSelectedProducto(data);
        }
    }, [isLoading, data, setSelectedProducto, selectedProduct]);

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
                <Edit />
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
        refreshTableFlag,
        closeModal: handleCloseModal,
        useServiceIndexProductos,
        renderersMap,
        initialValues,
    };
};
