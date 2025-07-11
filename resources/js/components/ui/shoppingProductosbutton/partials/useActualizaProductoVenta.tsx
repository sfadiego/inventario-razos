import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceUpdateVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useState } from 'react';
import * as Yup from 'yup';

interface useActualizaProductoVentaProps {
    record: IVentaProducto;
    refetchDatatable?: () => void;
}
export const useActualizaProductoVenta = (props: useActualizaProductoVentaProps) => {
    const { record, refetchDatatable } = props;
    const [errorMessage, seterror] = useState<string>('');
    const handleSuccess = () => {
        seterror('');
        if (refetchDatatable) {
            refetchDatatable();
        }
    };

    const initialValues: IVentaProducto = {
        id: record.id || 0,
        cantidad: record.cantidad || 1,
        precio: record.precio || 0,
        producto_id: record.producto_id || 0,
        venta_id: record.venta_id || 0,
    };

    const validationSchema = Yup.object().shape({
        cantidad: Yup.number().required('La cantidad es obligatoria').min(1, 'La cantidad debe ser al menos 1'),
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
