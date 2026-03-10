import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IDevolucionProducto, IDevolucionRequest } from '@/models/devolucion';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceStoreDevolucion } from '@/Services/devoluciones/useServiceDevoluciones';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { DataTableProps } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { DetailProductoDevolucion } from './DetailProductoDevolucion';

const defaultPayload: IDevolucionRequest = {
  venta_id: 0,
  motivo: '',
  productos: [],
};
export const useFormDevolucion = ({ ventaId = 0 }: { ventaId: number }) => {
  const { isLoading, data } = useServiceShowVenta(ventaId);
  const [msgValidacion, setMsgValidacion] = useState<string>('');
  const [productosDevolucion, setProductosDevolucion] = useState<IDevolucionProducto[] | null>(null);
  const [payloadDevolucion, setPayloadDevolucion] = useState<IDevolucionRequest>(defaultPayload);

  const motivo = payloadDevolucion.motivo || '';
  const enableBtnPayload = useMemo(() => {
    return motivo !== '' && ventaId !== 0 && (productosDevolucion?.length || 0) > 0;
  }, [motivo, ventaId, productosDevolucion]);

  const setMotivo = (motivo: string) => {
    if (motivo === '') {
      setMsgValidacion('El motivo es requerido');
    } else {
      setMsgValidacion('');
    }

    setPayloadDevolucion((prev) => ({
      ...prev,
      motivo,
    }));
  };

  useEffect(() => {
    setPayloadDevolucion((prev) => ({
      ...prev,
      productos: productosDevolucion || [],
      venta_id: ventaId,
    }));
  }, [productosDevolucion, ventaId]);

  const validateExist = (producto: IDevolucionProducto) => {
    if (productosDevolucion?.some((p) => p.producto_id === producto.producto_id)) {
      return true;
    }
    return false;
  };
  const handleRemove = (id: number) =>
    setProductosDevolucion((prev: IDevolucionProducto[] | null) => (prev ? prev.filter((p) => p.producto_id !== id) : null));

  const handleAdd = (item: IDevolucionProducto) => {
    if (validateExist(item)) {
      return;
    }

    setProductosDevolucion((prev: IDevolucionProducto[] | null) => [
      ...(prev || []),
      {
        producto_id: item.producto_id,
        nombre: item.nombre,
        unidad: item.unidad,
        precio_unitario: item.precio_unitario,
        cantidad: item.cantidad,
      },
    ]);
  };

  const renderersMap = useMemo(
    () => ({
      'producto.nombre': ({ producto }: IVentaProducto) =>
        `${producto?.nombre && producto.nombre.length > 10 ? producto.nombre.substring(0, 10) + '...' : producto?.nombre}`,
    }),
    [],
  );

  const { dataTableProps } = useDataTable({
    service: useServiceVentaProductoDetalle,
    payload: {
      serviceParamId: ventaId,
      filters: [],
    },
    renderersMap,
  });

  const rowExpansion: DataTableProps<IVentaProducto>['rowExpansion'] = {
    content: ({ record }: { record: IVentaProducto }) => {
      return <DetailProductoDevolucion validateExist={validateExist} producto={record} addProduct={handleAdd} />;
    },
  };

  const mutate = useServiceStoreDevolucion();
  const { onSubmit } = useOnSubmit<IDevolucionRequest>({
    mutateAsync: mutate.mutateAsync,
    onSuccess: async (data) => {
      console.log(data);
    },
  });
  //TODO: refrescar y validar
  const handleDevolucion = () => {
    onSubmit(payloadDevolucion, {});
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
    venta: {
      isLoading: !isLoading && !!data,
      data,
    },
  };
};
