import { IFilterItem } from '@/components/filters/modalFilter/types';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';

export interface IFiltroProducto {
    proveedor_id?: number;
    categoria_id?: number;
}
export const useProductosPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const renderersMap = {};
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
