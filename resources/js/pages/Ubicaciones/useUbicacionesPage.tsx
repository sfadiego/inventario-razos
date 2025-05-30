import { IFilterItem } from '@/components/filters/modalFilter/types';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';

export interface IFiltroUbicacion {
    nombre?: string;
}
export const useUbicacionesPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const renderersMap = {};
    const filters: IFilterItem[] = [
        {
            property: 'nombre',
            operator: 'like',
            value: '',
        },
    ];
    const initialValues: IFiltroUbicacion = {
        nombre: '',
    };

    return {
        openModal,
        isOpen,
        filters,
        closeModal,
        useServiceIndexUbicaciones,
        renderersMap,
        initialValues,
    };
};
