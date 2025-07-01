import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProductoForm } from '@/models/ventaProducto.interface';
import { useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { useServiceStoreVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import * as Yup from 'yup';
export const useAgregarProductoVenta = ({ ventaId, productoId }: { ventaId: number; productoId: number }) => {
    const { isLoading, data } = useServiceShowProducto(productoId);
    const initialValues: IVentaProductoForm = {
        cantidad: 1,
        precio: (!isLoading && data ? data.precio_venta : 0) || 0,
        producto_nombre: (!isLoading && data ? data.nombre : '') || '',
        producto_id: productoId || 0,
        venta_id: ventaId || 0,
    };

    const validationSchema = Yup.object().shape({
        cantidad: Yup.number()
            .required('La cantidad es requerida')
            .min(1, 'La cantidad debe ser al menos 1')
            .max(20, 'La cantidad no puede ser mayor a 20'),
        precio: Yup.number().required('El precio es requerido').min(0, 'El precio no puede ser negativo'),
        producto_nombre: Yup.string(),
        producto_id: Yup.number().required('No se ha precargado el producto correctamente.'),
        venta_id: Yup.number().required('No se ha precargado la venta correctamente.'),
    });

    const handleSuccess = async (data: IVentaProductoForm) => {
        console.log('Producto guardado exitosamente:', data);
    };

    const mutator = useServiceStoreVentaProducto();
    const { onSubmit } = useOnSubmit<IVentaProductoForm>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
        isPending: mutator.isPending,
    };
    return { formikProps, isPending: mutator.isPending };
};
