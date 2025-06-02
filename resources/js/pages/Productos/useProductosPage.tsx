import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { Edit } from 'lucide-react';

export interface IFiltroProducto {
    proveedor_id?: number;
    categoria_id?: number;
}
export const useProductosPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const renderersMap = {
        actions: ({ id }: IProducto) => (
            <Button variant="primary" size="sm">
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
        openModal,
        isOpen,
        filters,
        closeModal,
        useServiceIndexProductos,
        renderersMap,
        initialValues,
    };
};
