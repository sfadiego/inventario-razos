import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { StatusVentaEnum } from '@/enums/StatusVentaEnum';
import { formatDate } from '@/helper/dates';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta } from '@/models/venta.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceDeleteVenta, useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Eye, Printer, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export interface IFiltroVenta {
  nombre_venta: string;
  folio: string;
  cliente_id: number;
  tipo_compra: string;
  status_venta: StatusVentaEnum;
  created_at: string;
}
export const useVentasPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const [ventaId, setVentaId] = useState(0);
  const { isLoading, data } = useServiceShowVenta(ventaId);
  const mutatorDelete = useServiceDeleteVenta(ventaId);
  const { setItem, clearItem } = useSelectedItemStore();
  const navigate = useNavigate();

  const handleNewVentaModal = () => {
    setVentaId(0);
    clearItem('venta');
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setVentaId(0);
    clearItem('venta');
  };

  useEffect(() => {
    if (!isLoading && data && ventaId) {
      setItem('venta', data);
    }
  }, [isLoading, data, ventaId, setItem]);

  const queryClient = useQueryClient();
  const { onSubmit: onSubmitDelete } = useOnSubmit({
    mutateAsync: mutatorDelete.mutateAsync,
    onSuccess: async () => {
      setVentaId(0);
      queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.Venta}`] });
    },
  });

  const handleDelete = useCallback(() => {
    onSubmitDelete(null, {});
  }, [onSubmitDelete]);

  const warningDelete = () =>
    AlertSwal({
      type: AlertTypeEnum.Confirm,
      title: '¿Estás seguro de eliminar esta venta?',
      text: 'No podrás revertir esta acción',
      onConfirm: (result) => {
        if (result.isConfirmed) {
          handleDelete();
        }
      },
    });

  const renderersMap = {
    rowClassName: ({ status_venta }: IVenta): rowTypes | '' => {
      return status_venta == StatusVentaEnum.FINALIZADA ? 'redRow' : '';
    },
    created_at: ({ created_at }: IVenta) => {
      return formatDate(created_at, 'letters', ' ');
    },
    actions: ({ id, status_venta }: IVenta) => (
      <>
        <Button
          onClick={() => {
            openModal();
            setVentaId(id!);
          }}
          variant="primary"
          size="sm"
        >
          <Eye />
        </Button>

        <Button
          disabled={status_venta !== StatusVentaEnum.ACTIVA}
          onClick={() => {
            setVentaId(id!);
            warningDelete();
          }}
          variant="error"
          size="sm"
          className="ml-1"
        >
          <Trash2 />
        </Button>
        <Button className="ml-2" onClick={() => navigate(`/venta/${id}/productos`)} variant="outline" size="sm">
          <ArrowRight />
        </Button>
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
    openModal: handleNewVentaModal,
    closeModal: handleCloseModal,
  };
};
