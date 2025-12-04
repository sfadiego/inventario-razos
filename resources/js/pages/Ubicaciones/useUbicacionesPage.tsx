import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IUbicacion } from '@/models/ubicacion.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceDeleteUbicacion, useServiceIndexUbicaciones, useServiceShowUbicacion } from '@/Services/ubicaciones/useServiceUbicaciones';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { IFiltrosUbicacion } from './partials/useUbicacion';

export const useUbicacionesPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const [selected, setSelected] = useState(0);
  const { isLoading, data } = useServiceShowUbicacion(selected);
  const mutatorDelete = useServiceDeleteUbicacion(selected);
  const { clearItem, setItem } = useSelectedItemStore();
  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    clearItem('ubicacion');
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('ubicacion', data);
    }
  }, [isLoading, data, selected, setItem]);

  const queryClient = useQueryClient();
  const { onSubmit: onSubmitDelete } = useOnSubmit({
    mutateAsync: mutatorDelete.mutateAsync,
    onSuccess: async () => {
      setSelected(0);
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Ubicaciones}`],
      });
    },
  });

  const handleDelete = useCallback(() => {
    onSubmitDelete(null, {});
  }, [onSubmitDelete]);

  const confirmDelete = () => {
    AlertSwal({
      type: AlertTypeEnum.Confirm,
      onConfirm: (result) => {
        if (result.isConfirmed) {
          handleDelete();
        }
      },
    });
  };

  const renderersMap = {
    actions: ({ id, nombre }: IUbicacion) => {
      if (nombre == 'Almacén') {
        return null;
      }
      return (
        <>
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
          <Button
            className="ml-2"
            onClick={() => {
              setSelected(id!);
              confirmDelete();
            }}
            variant="error"
            size="sm"
          >
            <Trash2 />
          </Button>
        </>
      );
    },
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
