import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertToast } from '@/components/alertToast/AlertToast';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { StatusDevolucionEnum } from '@/enums/StatusDevolucionEnum';
import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IDevolucionProducto, IDevolucionRequest } from '@/models/devolucion';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import {
  useServiceShowDevolucionByVenta,
  useServiceStoreDevolucion,
  useServiceUpdateDevolucion,
} from '@/Services/devoluciones/useServiceDevoluciones';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useQueryClient } from '@tanstack/react-query';
import { DataTableProps } from 'mantine-datatable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DetailProductoDevolucion } from '../DetailProductoDevolucion/DetailProductoDevolucion';
import { ProductoUnidadEnum } from '@/enums/ProductoUnidadEnum';

interface IUseFormDevolucionProps {
  ventaId: number;
  onClose: () => void;
}

const createInitialPayload = (ventaId: number): IDevolucionRequest => ({
  venta_id: ventaId,
  motivo: '',
  productos: [],
});

export const useFormDevolucion = ({ ventaId = 0, onClose }: IUseFormDevolucionProps) => {
  const queryClient = useQueryClient();
  const [msgValidacion, setMsgValidacion] = useState<string>('');
  const [payload, setPayload] = useState<IDevolucionRequest>(() => createInitialPayload(ventaId));

  const { isLoading, data, refetch } = useServiceShowDevolucionByVenta(ventaId);

  useEffect(() => {
    if (data?.devolucion) {
      const dev = data.devolucion;
      setPayload({
        venta_id: ventaId,
        motivo: dev.motivo || '',
        productos: (dev.detalle || []).map((d: any) => ({
          producto_id: d.producto_id,
          nombre: d.producto?.nombre || '???',
          unidad: d.producto?.unidad || ProductoUnidadEnum.Pieza,
          precio_unitario: d.precio_unitario,
          cantidad: d.cantidad,
        })),
      });
    } else {
      setPayload(createInitialPayload(ventaId));
    }
  }, [data, ventaId]);

  const handleClose = useCallback(() => {
    setPayload(createInitialPayload(ventaId));
    setMsgValidacion('');
    onClose();
  }, [onClose, ventaId]);

  const validateExist = useCallback(
    (productoId: number) => {
      return payload.productos.some((p) => p.producto_id === productoId);
    },
    [payload.productos],
  );

  const handleAdd = useCallback(
    (item: IDevolucionProducto) => {
      if (validateExist(item.producto_id)) {
        setMsgValidacion('El producto ya está en la lista');
        return;
      }
      setMsgValidacion('');
      setPayload((prev) => ({ ...prev, productos: [...prev.productos, item] }));
    },
    [validateExist],
  );

  const handleRemove = useCallback((id: number) => {
    setPayload((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.producto_id !== id),
    }));
  }, []);

  const setMotivo = (nuevoMotivo: string) => {
    setMsgValidacion(nuevoMotivo === '' ? 'El motivo es requerido' : '');
    setPayload((prev) => ({ ...prev, motivo: nuevoMotivo }));
  };

  const { dataTableProps } = useDataTable({
    service: useServiceVentaProductoDetalle,
    payload: { serviceParamId: ventaId, filters: [] },
    renderersMap: useMemo(
      () => ({
        'producto.nombre': ({ producto }: IVentaProducto) => {
          const nombre = producto?.nombre || '';
          return nombre.length > 15 ? `${nombre.substring(0, 15)}...` : nombre;
        },
      }),
      [],
    ),
  });

  const rowExpansion: DataTableProps<IVentaProducto>['rowExpansion'] = {
    content: ({ record }) => (
      <DetailProductoDevolucion
        hasDevolucion={!!data?.devolucion}
        validateExist={() => validateExist(record.producto_id)}
        producto={record}
        addProduct={handleAdd}
      />
    ),
  };

  const devolucionId = data?.devolucion?.id || 0;
  const devolucionCancelada = data?.devolucion?.status === StatusDevolucionEnum.CANCELADA;
  const storeMutation = useServiceStoreDevolucion();
  const updateMutation = useServiceUpdateDevolucion(devolucionId);

  const { onSubmit } = useOnSubmit<IDevolucionRequest>({
    mutateAsync: devolucionId ? updateMutation.mutateAsync : storeMutation.mutateAsync,
    onSuccess: async () => {
      AlertSwal({
        title: `Devolución ${devolucionId ? 'actualizada' : 'creada'}`,
        type: AlertTypeEnum.Success,
      });
      queryClient.invalidateQueries({ queryKey: [ApiRoutes.Devoluciones] });
      refetch();
      handleClose();
    },
    onError(data: any) {
      handleClose();
      if (data?.response?.data?.message) {
        const msg = data?.response?.data?.message || '';
        AlertToast({
          type: 'error',
          message: msg,
        });
      } else {
        AlertToast({
          type: 'error',
          message: 'Revisa el stock',
        });
      }
    },
  });

  const handleSubmit = () => {
    const isInvalid = ventaId === 0 || payload.motivo.trim() === '' || payload.productos.length === 0;

    if (isInvalid) {
      setMsgValidacion('Verifica que el motivo y los productos estén presentes');
      return;
    }

    onSubmit(payload, {});
  };

  return {
    dataTableProps,
    rowExpansion,
    productosDevolucion: payload.productos,
    handleDevolucion: handleSubmit,
    handleRemove,
    setMotivo,
    msgValidacion,
    motivo: payload.motivo,
    enableBtnPayload: ventaId !== 0 && payload.motivo.trim() !== '' && payload.productos.length > 0,
    devolucionCreada: !!data?.devolucion,
    devolucionCancelada,
    handleClose,
    venta: { isLoading, data },
  };
};
