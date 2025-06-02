import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IUbicacion } from '@/models/ubicacion.interface';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';
import { Edit } from 'lucide-react';

export interface IFiltroUbicacion {
    nombre?: string;
}
export const useUbicacionesPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const renderersMap = {
        actions: ({ id }: IUbicacion) => (
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
