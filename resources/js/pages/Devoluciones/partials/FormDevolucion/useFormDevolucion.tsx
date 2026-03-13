import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IDevolucionProducto, IDevolucionRequest } from '@/models/devolucion';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceShowDevolucionByVenta, useServiceStoreDevolucion } from '@/Services/devoluciones/useServiceDevoluciones';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useQueryClient } from '@tanstack/react-query';
import { DataTableProps } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { DetailProductoDevolucion } from '../DetailProductoDevolucion/DetailProductoDevolucion';

export const useFormDevolucion = ({ ventaId = 0, onClose }: { ventaId: number; onClose: () => void }) => {
  const { isLoading, data, refetch } = useServiceShowDevolucionByVenta(ventaId);
  const [msgValidacion, setMsgValidacion] = useState<string>('');

  const [payload, setPayload] = useState<IDevolucionRequest>({
    venta_id: ventaId,
    motivo: '',
    productos: [],
  });

  useEffect(() => {
    setPayload({
      venta_id: ventaId,
      motivo: '',
      productos: [],
    });
  }, [ventaId]);

  useEffect(() => {
    if (data?.devolucion && !isLoading) {
      const dev = data.devolucion;

      const productosPreexistentes: IDevolucionProducto[] = (dev.detalle || []).map((d: any) => ({
        producto_id: d.producto_id,
        nombre: d.producto?.nombre || 'Producto',
        unidad: d.producto?.unidad || 'pza',
        precio_unitario: d.precio_unitario,
        cantidad: d.cantidad,
      }));

      setPayload({
        venta_id: ventaId,
        motivo: dev.motivo || '',
        productos: productosPreexistentes,
      });
    }
  }, [data, isLoading, ventaId]);

  const handleClose = () => {
    setPayload({ venta_id: 0, motivo: '', productos: [] });
    onClose();
  };

  const productosDevolucion = payload.productos;
  const motivo = payload.motivo;
  const devolucionCreada = !!data?.devolucion;

  const enableBtnPayload = useMemo(() => {
    return motivo.trim() !== '' && ventaId !== 0 && productosDevolucion.length > 0;
  }, [motivo, ventaId, productosDevolucion]);

  const setMotivo = (nuevoMotivo: string) => {
    setMsgValidacion(nuevoMotivo === '' ? 'El motivo es requerido' : '');
    setPayload((prev) => ({ ...prev, motivo: nuevoMotivo }));
  };

  const validateExist = (producto: IDevolucionProducto) => {
    return productosDevolucion.some((p) => p.producto_id === producto.producto_id);
  };

  const handleAdd = (item: IDevolucionProducto) => {
    if (validateExist(item)) {
      setMsgValidacion('El producto ya está en la lista');
      return;
    }
    setPayload((prev) => ({ ...prev, productos: [...prev.productos, item] }));
  };

  const handleRemove = (id: number) => {
    setPayload((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.producto_id !== id),
    }));
  };

  const { dataTableProps } = useDataTable({
    service: useServiceVentaProductoDetalle,
    payload: { serviceParamId: ventaId, filters: [] },
    renderersMap: useMemo(
      () => ({
        'producto.nombre': ({ producto }: IVentaProducto) =>
          producto?.nombre && producto.nombre.length > 15 ? `${producto.nombre.substring(0, 15)}...` : producto?.nombre || '',
      }),
      [],
    ),
  });

  const rowExpansion: DataTableProps<IVentaProducto>['rowExpansion'] = {
    content: ({ record }) => <DetailProductoDevolucion validateExist={validateExist} producto={record} addProduct={handleAdd} />,
  };

  const mutate = useServiceStoreDevolucion();
  const queryClient = useQueryClient();
  const { onSubmit } = useOnSubmit<IDevolucionRequest>({
    mutateAsync: mutate.mutateAsync,
    onSuccess: async () => {
      AlertSwal({
        title: 'Devolución creada',
        type: AlertTypeEnum.Success,
      });
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Devoluciones}`],
      });
      refetch();
      handleClose();
    },
  });

  const handleDevolucion = () => {
    if (!enableBtnPayload) {
      setMsgValidacion('Verifica que el motivo y los productos estén presentes');
      return;
    }
    onSubmit(payload, {});
  };

  return {
    dataTableProps,
    rowExpansion,
    productosDevolucion,
    handleDevolucion,
    handleRemove,
    setMotivo,
    msgValidacion,
    motivo,
    enableBtnPayload,
    devolucionCreada,
    handleClose,
    venta: {
      isLoading,
      data,
    },
  };
};
