import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta } from '@/models/venta.interface';
import { useServiceStoreVenta } from '@/Services/ventas/useServiceVenta';
import * as Yup from 'yup';
import { useVentasStore } from './useVentasStore';
export const useFormVenta = () => {
    const { venta, setVenta } = useVentasStore();
    const validationSchema = Yup.object().shape({
        venta_total: Yup.number(),
        nombre_venta: Yup.string().max(100, 'El nombre no puede exceder 100 caracteres'),
        cliente_id: Yup.number().nullable(),
        tipo_compra: Yup.string().oneOf(['contado', 'credito'], 'Tipo de compra inválido').required('El tipo de compra es obligatorio'),
    });
    const initialValues: IVenta = {
        id: venta?.id ?? 0,
        venta_total: venta?.venta_total ?? 0,
        nombre_venta: venta?.nombre_venta ?? '',
        cliente_id: venta?.cliente_id ?? null,
        tipo_compra: venta?.tipo_compra ?? 'contado',
    };
    const handleSuccess = (venta: IVenta) => setVenta(venta);
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
        ventaActual: venta,
        disabled: !!venta?.id,
        resetVenta: () => {
            setVenta(null);
        },
    };
};
