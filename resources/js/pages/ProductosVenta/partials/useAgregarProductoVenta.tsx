import { AlertToast } from '@/components/alertToast/AlertToast';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProductoForm } from '@/models/ventaProducto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { useServiceStoreVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';

interface IAgregarProductosVentaProps {
  productoId: number;
  closeModal?: () => void;
}

export const useAgregarProductoVenta = ({ productoId, closeModal }: IAgregarProductosVentaProps) => {
  const { id } = useParams();
  const ventaId = id ? Number(id) : 0;
  const { refetch: refetchCartNumber } = useServiceCountVentaProducto(ventaId);
  const { data } = useServiceShowProducto(productoId);
  const mutator = useServiceStoreVentaProducto();
  const queryClient = useQueryClient();

  const [error, setError] = useState('');

  // limpiar error cuando cambia producto
  useEffect(() => {
    setError('');
  }, [productoId]);

  const handleCloseModal = useCallback(() => {
    setError('');
    closeModal?.();
  }, [closeModal]);

  const handleSuccess = useCallback(async () => {
    AlertToast({ type: 'success', message: 'Producto guardado exitosamente' });
    await refetchCartNumber();
    queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.Venta}/${ventaId}`] });
    handleCloseModal();
  }, [refetchCartNumber, queryClient, ventaId, handleCloseModal]);

  const onSubmit = useOnSubmit<IVentaProductoForm>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: handleSuccess,
    onError: (data: any) => setError(data?.response?.data.message || data.message),
  }).onSubmit;

  const stock = data?.stock ?? 0;

  const initialValues: IVentaProductoForm = useMemo(
    () => ({
      cantidad: 1,
      precio: data?.precio_venta ?? 0,
      producto_nombre: data?.nombre ?? '',
      producto_id: productoId,
      venta_id: ventaId,
    }),
    [data, productoId, ventaId],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        cantidad: Yup.number()
          .required('La cantidad es requerida')
          .min(1, 'La cantidad debe ser al menos 1')
          .max(20, 'La cantidad no puede ser mayor a 20'),
        precio: Yup.number()
          .required('El precio es requerido')
          .min(0, 'El precio no puede ser negativo')
          .moreThan(0, 'El precio debe ser mayor que cero'),
        producto_nombre: Yup.string(),
        producto_id: Yup.number().required('No se ha precargado el producto correctamente.'),
        venta_id: Yup.number().required('No se ha precargado la venta correctamente.'),
      }),
    [],
  );

  return {
    formikProps: { initialValues, validationSchema, onSubmit, isPending: mutator.isPending },
    isPending: mutator.isPending,
    onErrorMessage: error,
    stock,
  };
};
