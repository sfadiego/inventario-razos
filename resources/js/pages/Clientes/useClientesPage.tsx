import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { ICliente } from '@/models/cliente.interface';
import { useServiceIndexClientes, useServiceShowCliente } from '@/Services/clientes/useServiceClientes';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface IFiltroCliente {
  nombre: string;
  confiable?: boolean;
  observaciones?: string;
}
export const useClientesPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selected, setSelected] = useState<number>(0);
  const { isLoading, data } = useServiceShowCliente(selected);
  const { setItem, clearItem } = useSelectedItemStore();

  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    clearItem('cliente');
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('cliente', data);
    }
  }, [isLoading, data, selected, setItem]);

  const renderersMap = {
    rowClassName: ({ adeudo }: ICliente): rowTypes | '' => {
      return adeudo < 0 ? 'redRow' : '';
    },
    confiable: ({ confiable }: ICliente) => (
      <Badge variant="solid" color={`${!confiable ? 'error' : 'success'}`}>{`${!confiable ? 'No' : 'Si'}`}</Badge>
    ),
    actions: ({ id }: ICliente) => (
      <Button
        onClick={() => {
          openModal();
          setSelected(id!);
        }}
        variant="primary"
        size="sm"
      >
        <Edit />
      </Button>
    ),
  };
  const filters: IFilters<IFiltroCliente>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  const handleOpen = () => {
    openModal();
    clearItem('cliente');
    setSelected(0);
  };

  return {
    useServiceIndexClientes,
    renderersMap,
    filters,
    isOpen,
    openModal: handleOpen,
    closeModal: handleCloseModal,
  };
};
