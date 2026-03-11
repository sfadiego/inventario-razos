import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { formatDate } from '@/helper/dates';
import { useModal } from '@/hooks/useModal';
import { IVentaDevoluciones } from '@/models/devolucion';
import { Coins } from 'lucide-react';
import { useMemo, useState } from 'react';

export const useDevolucionesPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [ventaId, setventaId] = useState<number>(0);

  const renderersMap = useMemo(() => {
    return {
      rowClassName: ({ tieneDevolucion }: IVentaDevoluciones): rowTypes | '' => {
        return tieneDevolucion ? 'redRow' : '';
      },
      created_at: (item: IVentaDevoluciones) => formatDate(item.created_at, 'letters', ' '),
      tieneDevolucion: (item: IVentaDevoluciones) => (item.tieneDevolucion ? 'Sí' : 'No'),
      actions: ({ id, devolucion_id }: IVentaDevoluciones) => {
        // if (!devolucion_id) {
        return (
          <>
            <Button
              onClick={() => {
                setventaId(id);
                openModal();
              }}
              variant="primary"
              size="sm"
            >
              <Coins />
            </Button>
          </>
        );
        // }
      },
    };
  }, [openModal]);

  const filters: IFilters<IVentaDevoluciones>[] = [
    {
      property: 'folio',
      operator: '=',
      initialValue: '',
    },
  ];

  return {
    isOpen,
    openModal,
    closeModal,
    renderersMap,
    filters,
    ventaId,
  };
};
