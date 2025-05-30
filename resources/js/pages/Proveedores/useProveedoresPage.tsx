import { IFilterItem } from '@/components/filters/modalFilter/types';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';

export interface IFiltroProveedor {
    nombre: string;
    empresa?: string;
    observaciones?: string;
}
export const useProveedoresPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const renderersMap = {};
    const filters: IFilterItem[] = [
        {
            property: 'nombre',
            operator: 'like',
            value: '',
        },
    ];
    const initialValues: IFiltroProveedor = {
        nombre: '',
        empresa: '',
        observaciones: '',
    };
    return { useServiceIndexProveedor, initialValues, renderersMap, filters, isOpen, openModal, closeModal };
};
