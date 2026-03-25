import { ProductoUnidadEnum } from '@/enums/ProductoUnidadEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceUpdateVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useState } from 'react';
import * as Yup from 'yup';

interface useActualizaProductoVentaProps {
  record: IVentaProducto;
  refetchDatatable?: () => void;
}
export const useActualizaProductoVenta = (props: useActualizaProductoVentaProps) => {
  const { record, refetchDatatable } = props;
  const [errorMessage, seterror] = useState<string>('');
  const { refetch: refetchVenta } = useServiceShowVenta(record.venta_id);
  const handleSuccess = () => {
    seterror('');
    if (refetchDatatable) {
      refetchDatatable();
    }
    refetchVenta();
  };

  const unidadMetro = record.producto?.unidad == ProductoUnidadEnum.Metro;
  const initialValues: IVentaProducto = {
    id: record.id || 0,
    cantidad: record.cantidad || 1,
    precio: record.precio || 0,
    producto_id: record.producto_id || 0,
    venta_id: record.venta_id || 0,
  };

  const validationSchema = Yup.object().shape({
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
      }),
    precio: Yup.number().required('El precio es obligatorio').min(0, 'El precio no puede ser negativo'),
    producto_id: Yup.number().required('El producto es obligatorio').min(1, 'Seleccione un producto válido'),
    producto_nombre: Yup.string(),
    venta_id: Yup.number().required('La venta es obligatoria').min(1, 'Seleccione una venta válida'),
  });

  const mutatorUpdate = useServiceUpdateVentaProducto(record?.id ?? 0);
  const { onSubmit } = useOnSubmit<IVentaProducto>({
    mutateAsync: mutatorUpdate.mutateAsync,
    onSuccess: async () => handleSuccess(),
    onError: (data: any) => seterror(data?.response?.data.message || data.message),
  });

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };
  return { formikProps, isPending: mutatorUpdate.isPending, onErrorMessage: errorMessage };
};
