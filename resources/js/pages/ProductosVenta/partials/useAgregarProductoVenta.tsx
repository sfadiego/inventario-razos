import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProductoForm } from '@/models/ventaProducto.interface';
import { useServiceStoreVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import * as Yup from 'yup';
export const useAgregarProductoVenta = () => {
    const initialValues: IVentaProductoForm = {
        cantidad: 0,
        precio: 0,
        producto_nombre: '',
        producto_id: 0,
        venta_id: 0,
    };

    const validationSchema = Yup.object().shape({
        cantidad: Yup.number(),
        precio: Yup.number(),
        producto_nombre: Yup.number(),
        producto_id: Yup.number(),
        venta_id: Yup.number(),
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
