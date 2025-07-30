import { IFilters } from '@/components/filters/modalFilter/types';
import { useModal } from '@/hooks/useModal';

export interface IFiltroReporteMovimiento {
    producto_id?: string;
    nombre?: string;
    tipo_movimiento_id?: string;
    user_id?: string;
    fecha_movimiento?: string;
}

const filters: IFilters<IFiltroReporteMovimiento>[] = [
    {
        property: 'nombre',
        operator: 'like',
        initialValue: '',
    },
];

export const useReportesPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const renderersMap = {};

    return {
        openModal,
        isOpen,
        filters,
        closeModal,
        renderersMap,
    };
};
