import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos, useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProductoStore } from './partials/useProductoStore';

export interface IFiltroProducto {
    nombre?: string;
    proveedor_id?: number;
    categoria_id?: number;
}

export const useProductosPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const [selectedProduct, setselectedProduct] = useState(0);
    const { isLoading, data } = useServiceShowProducto(selectedProduct);
    const { setSelectedProducto } = useProductoStore();
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
        rowClassName: ({ stock, cantidad_minima }: IProducto): rowTypes | '' => {
            return cantidad_minima >= stock ? 'redRow' : '';
        },
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
    const filters: IFilters<IFiltroProducto>[] = [
        {
            property: 'nombre',
            operator: 'like',
            initialValue: '',
        },
    ];

    return {
        openModal: handleOpenModal,
        isOpen,
        filters,
        closeModal: handleCloseModal,
        useServiceIndexProductos,
        renderersMap,
    };
};
