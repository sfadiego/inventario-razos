import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IUbicacion } from '@/models/ubicacion.interface';
import { useServiceIndexUbicaciones, useServiceShowUbicacion } from '@/Services/ubicaciones/useServiceUbicaciones';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IFiltrosUbicacion } from './partials/useUbicacion';
import { useUbicacionStore } from './partials/useUbicacionStore';

export const useUbicacionesPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const [selected, setSelected] = useState(0);
  const { isLoading, data } = useServiceShowUbicacion(selected);
  const { setSelectedUbicacion } = useUbicacionStore();
  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    setSelectedUbicacion(null);
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setSelectedUbicacion(data);
    }
  }, [isLoading, data, selected, setSelectedUbicacion]);

  const renderersMap = {
    actions: ({ id }: IUbicacion) => (
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
  const filters: IFilters<IFiltrosUbicacion>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  return {
    openModal,
    isOpen,
    filters,
    closeModal: handleCloseModal,
    useServiceIndexUbicaciones,
    renderersMap,
  };
};
