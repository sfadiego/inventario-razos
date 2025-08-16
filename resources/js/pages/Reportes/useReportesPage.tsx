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
  created_at?: string;
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
    rowClassName: ({ tipo_movimiento_id, cantidad }: IReporteMovimiento): rowTypes | '' => {
      switch (tipo_movimiento_id) {
        case TipoMovimientoEnum.Ajuste:
          if (cantidad > 0) {
            return '';
          }
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
