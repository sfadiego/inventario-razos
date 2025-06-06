import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta } from '@/models/venta.interface';
import { useServiceStoreVenta } from '@/Services/ventas/useServiceVenta';
import * as Yup from 'yup';
export const useFormVenta = () => {
    const validationSchema = Yup.object().shape({
        venta_total: Yup.number(),
        nombre_venta: Yup.string().max(100, 'El nombre no puede exceder 100 caracteres'),
        cliente_id: Yup.number(),
        tipo_compra: Yup.string().oneOf(['contado', 'credito'], 'Tipo de compra inválido').required('El tipo de compra es obligatorio'),
    });
    const initialValues: IVenta = {
        id: 0,
        venta_total: 0,
        nombre_venta: '',
        cliente_id: 0,
        tipo_compra: 'contado',
    };
    const handleSuccess = (venta: IVenta) => {
        console.log('success', venta);
    };
    const mutator = useServiceStoreVenta();
    const { onSubmit } = useOnSubmit<IVenta>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data: IVenta) => handleSuccess(data),
    });
    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return {
        formikProps,
        isPending: mutator.isPending,
    };
};
