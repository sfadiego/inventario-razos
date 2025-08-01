import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import { TipoMovimientoEnum } from '@/enums/tipoMovimientoEnum';
import { useModal } from '@/hooks/useModal';
import { IReporteMovimiento } from '@/models/reporteMovimiento.interface';

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
    const renderersMap = {
        rowClassName: ({ tipo_movimiento_id }: IReporteMovimiento): rowTypes | '' => {
            switch (tipo_movimiento_id) {
                case TipoMovimientoEnum.Salida:
                    return 'greenRow';
                case TipoMovimientoEnum.Ajuste:
                    return 'redRow';
                default:
                    return '';
            }
        },
    };

    return {
        openModal,
        isOpen,
        filters,
        closeModal,
        renderersMap,
    };
};
