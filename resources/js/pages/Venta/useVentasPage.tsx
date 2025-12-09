import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IVenta, StatusVenta } from '@/models/venta.interface';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { ArrowRight, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export interface IFiltroVenta {
  nombre_venta: string;
  folio: string;
  cliente_id: number;
  tipo_compra: string;
  status_venta: StatusVenta;
}
export const useVentasPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const [selected, setSelected] = useState(0);
  const { isLoading, data } = useServiceShowVenta(selected);
  const { setItem, clearItem } = useSelectedItemStore();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    openModal();
    setSelected(0);
    clearItem('venta');
  };

  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    clearItem('venta');
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('venta', data);
    }
  }, [isLoading, data, selected, setItem]);

  const renderersMap = {
    actions: ({ id, status_venta }: IVenta) => (
      <>
        <Button
          onClick={() => {
            openModal();
            setSelected(id!);
          }}
          variant="primary"
          size="sm"
        >
          <Eye />
        </Button>
        {status_venta == 'activa' && (
          <Button className="ml-2" onClick={() => navigate(`/venta/${id}/productos`)} variant="outline" size="sm">
            <ArrowRight />
          </Button>
        )}
      </>
    ),
  };
  const filters: IFilters<IFiltroVenta>[] = [
    {
      property: 'nombre_venta',
      operator: 'like',
      initialValue: '',
    },
  ];

  return {
    renderersMap,
    isOpen,
    filters,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };
};
