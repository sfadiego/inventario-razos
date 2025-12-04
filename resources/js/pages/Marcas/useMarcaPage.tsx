import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IMarca } from '@/models/marca.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceDeleteMarca, useServiceShowMarca } from '@/Services/marcas/useServiceMarcas';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const useMarcaPage = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const [selected, setSelected] = useState<number>(0);
  const { setItem } = useSelectedItemStore();
  const { isLoading, data } = useServiceShowMarca(selected);
  const mutatorDelete = useServiceDeleteMarca(selected);
  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('marca', data);
    }
  }, [isLoading, data, selected, setItem]);

  const queryClient = useQueryClient();
  const { onSubmit: onSubmitDelete } = useOnSubmit({
    mutateAsync: mutatorDelete.mutateAsync,
    onSuccess: async () => {
      setSelected(0);
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Marcas}`],
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
    actions: (item: IMarca) => {
      if (item.nombre == 'Sin definir') {
        return null;
      }

      return (
        <>
          <Button
            onClick={() => {
              setSelected(item.id!);
              openModal();
            }}
            variant="primary"
            size="sm"
          >
            <Edit />
          </Button>
          <Button
            className="ml-2"
            onClick={() => {
              setSelected(item.id!);
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

  const filters: IFilters<IMarca>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  return { renderersMap, filters, openModal, closeModal, isOpen };
};
