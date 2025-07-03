import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceUpdateVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import * as Yup from 'yup';

export const useActualizaProductoVenta = ({ item }: { item: IVentaProducto }) => {
    const handleSuccess = (data: IVentaProducto) => {
        console.log(data);
    };

    const initialValues: IVentaProducto = {
        id: item.id || 0,
        cantidad: item.cantidad || 1,
        precio: item.precio || 0,
        producto_id: item.producto_id || 0,
        venta_id: item.venta_id || 0,
    };

    const validationSchema = Yup.object().shape({
        cantidad: Yup.number().required('La cantidad es obligatoria').min(1, 'La cantidad debe ser al menos 1'),
        precio: Yup.number().required('El precio es obligatorio').min(0, 'El precio no puede ser negativo'),
        producto_id: Yup.number().required('El producto es obligatorio').min(1, 'Seleccione un producto válido'),
        producto_nombre: Yup.string(),
        venta_id: Yup.number().required('La venta es obligatoria').min(1, 'Seleccione una venta válida'),
    });

    const mutatorUpdate = useServiceUpdateVentaProducto(item?.id ?? 0);
    const { onSubmit } = useOnSubmit<IVentaProducto>({
        mutateAsync: mutatorUpdate.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps };
};
