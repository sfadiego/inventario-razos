import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceIndexClientes, useServiceShowCliente } from '@/Services/clientes/useServiceClientes';
import { useServiceLiquidarAdeudo } from '@/Services/clientes/useServiceLiquidarAdeudos';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { Edit } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

  const [adeudoId, setadeudoId] = useState<number>(0);
  const mutateUpdate = useServiceLiquidarAdeudo(adeudoId);
  const queryClient = useQueryClient();
  const { onSubmit } = useOnSubmit({
    mutateAsync: mutateUpdate.mutateAsync,
    onSuccess: async () => {
      AlertSwal({
        title: `Exito`,
        text: `Adeudo pagado`,
      });
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Clientes}`],
      });
    },
  });

  const handleUpdateAdeudo = (adeudoId: number) => {
    setadeudoId(adeudoId);
    closeModal();
    AlertSwal({
      title: '¿Estás seguro?',
      text: '¿Deseas liquidar este adeudo?',
      type: AlertTypeEnum.Confirm,
      onCancel: () => setadeudoId(0),
      onConfirm: (result) => {
        if (result.isConfirmed) {
          onSubmit({}, {});
        }
      },
    });
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('cliente', data);
    }
  }, [isLoading, data, selected, setItem]);

  const renderersMap = useMemo(() => {
    return {
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
  }, [openModal]);

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
    handleUpdateAdeudo,
  };
};
