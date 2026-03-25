import { AlertToast } from '@/components/alertToast/AlertToast';
import { ProductoUnidadEnum } from '@/enums/ProductoUnidadEnum';
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
  const unidadMetro = data?.unidad == ProductoUnidadEnum.Metro;

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
          .transform((value, originalValue) => {
            return originalValue === '' ? null : value;
          })
          .required('La cantidad es requerida')
          .min(0, 'El precio no puede ser negativo')
          .moreThan(0, 'El precio debe ser mayor que cero')
          .test('es-entero', 'La cantidad debe ser un número entero para esta unidad', (value) => {
            if (unidadMetro) return true;
            return Number.isInteger(value);
          })
          .max(stock, `La cantidad no puede ser mayor a ${stock}`),
        precio: Yup.number()
          .required('El precio es requerido')
          .min(0, 'El precio no puede ser negativo')
          .moreThan(0, 'El precio debe ser mayor que cero'),
        producto_nombre: Yup.string(),
        producto_id: Yup.number().required('No se ha precargado el producto correctamente.'),
        venta_id: Yup.number().required('No se ha precargado la venta correctamente.'),
      }),
    [stock, unidadMetro],
  );

  return {
    formikProps: { initialValues, validationSchema, onSubmit, isPending: mutator.isPending },
    isPending: mutator.isPending,
    onErrorMessage: error,
    stock,
  };
};
