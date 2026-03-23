import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { formatDate } from '@/helper/dates';
import { useModal } from '@/hooks/useModal';
import { IVentaDevoluciones } from '@/models/devolucion';
import { HandCoins, Info } from 'lucide-react';
import { useMemo, useState } from 'react';

export const useDevolucionesPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [ventaId, setventaId] = useState<number>(0);

  const renderersMap = useMemo(() => {
    return {
      rowClassName: ({ devolucion }: IVentaDevoluciones): rowTypes | '' => {
        const hasDevolucionActiva = devolucion?.id !== undefined;
        return hasDevolucionActiva ? 'redRow' : '';
      },
      'devolucion.status': ({ devolucion, devoluciones }: IVentaDevoluciones) => {
        const hasDevolucionActiva = devolucion?.id !== undefined;
        return hasDevolucionActiva ? 'Tiene devolución' : devoluciones && devoluciones.length >= 2 ? 'Máximo 2 devoluciones' : ' -- ';
      },
      created_at: (item: IVentaDevoluciones) => formatDate(item.created_at, 'letters', ' '),
      actions: ({ id, devoluciones }: IVentaDevoluciones) => {
        return (
          <>
            {devoluciones && devoluciones?.length > 0 && (
              <Button onClick={() => null} variant="outline" className="mr-2" size="sm" disabled={true}>
                <Info />
              </Button>
            )}
            <Button
              onClick={() => {
                setventaId(id);
                openModal();
              }}
              disabled={devoluciones && devoluciones?.length >= 2 ? true : false}
              variant="primary"
              size="sm"
            >
              <HandCoins />
            </Button>
          </>
        );
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
