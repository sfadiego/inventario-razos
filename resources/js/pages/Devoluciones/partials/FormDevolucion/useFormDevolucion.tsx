import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IDevolucionProducto, IDevolucionRequest } from '@/models/devolucion';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceShowDevolucion, useServiceStoreDevolucion } from '@/Services/devoluciones/useServiceDevoluciones';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { DataTableProps } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { DetailProductoDevolucion } from '../DetailProductoDevolucion/DetailProductoDevolucion';

export const useFormDevolucion = ({ ventaId = 0, onClose }: { ventaId: number; onClose: () => void }) => {
  const { isLoading, data } = useServiceShowDevolucion(ventaId);
  const [msgValidacion, setMsgValidacion] = useState<string>('');
  const [payload, setPayload] = useState<IDevolucionRequest>({
    venta_id: ventaId,
    motivo: '',
    productos: [],
  });

  useEffect(() => {
    if (ventaId) {
      setPayload((prev) => ({
        ...prev,
        venta_id: ventaId,
        motivo: data?.devolucion?.motivo || prev.motivo,
      }));
    }
  }, [ventaId, data]);

  const handleClose = () => {
    onClose();
    setPayload({
      venta_id: ventaId,
      motivo: '',
      productos: [],
    });
  };

  const devolucionCreada = !!data?.devolucion_id;
  const productosDevolucion = payload.productos;
  const motivo = payload.motivo;

  const enableBtnPayload = useMemo(() => {
    return motivo.trim() !== '' && payload.venta_id !== 0 && productosDevolucion.length > 0;
  }, [motivo, payload.venta_id, productosDevolucion]);

  const setMotivo = (nuevoMotivo: string) => {
    setMsgValidacion(nuevoMotivo === '' ? 'El motivo es requerido' : '');
    setPayload((prev) => ({ ...prev, motivo: nuevoMotivo }));
  };

  const validateExist = (producto: IDevolucionProducto) => {
    return productosDevolucion.some((p) => p.producto_id === producto.producto_id);
  };

  const handleAdd = (item: IDevolucionProducto) => {
    if (validateExist(item)) return;

    setPayload((prev) => ({
      ...prev,
      productos: [...prev.productos, item],
    }));
  };

  const handleRemove = (id: number) => {
    setPayload((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.producto_id !== id),
    }));
  };

  const renderersMap = useMemo(
    () => ({
      'producto.nombre': ({ producto }: IVentaProducto) =>
        producto?.nombre && producto.nombre.length > 15 ? `${producto.nombre.substring(0, 15)}...` : producto?.nombre || '',
    }),
    [],
  );

  const { dataTableProps } = useDataTable({
    service: useServiceVentaProductoDetalle,
    payload: { serviceParamId: ventaId, filters: [] },
    renderersMap,
  });

  const rowExpansion: DataTableProps<IVentaProducto>['rowExpansion'] = {
    content: ({ record }) => <DetailProductoDevolucion validateExist={validateExist} producto={record} addProduct={handleAdd} />,
  };

  const mutate = useServiceStoreDevolucion();
  const { onSubmit } = useOnSubmit<IDevolucionRequest>({
    mutateAsync: mutate.mutateAsync,
    onSuccess: async (res) => console.log('Éxito:', res),
  });

  const handleDevolucion = () => {
    if (enableBtnPayload) {
      onSubmit(payload, {});
    }
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
