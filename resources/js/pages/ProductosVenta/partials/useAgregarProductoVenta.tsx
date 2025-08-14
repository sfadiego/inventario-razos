import { AlertToast } from '@/components/alertToast/AlertToast';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProductoForm } from '@/models/ventaProducto.interface';
import { useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { useServiceStoreVentaProducto } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceCountVentaProducto } from '@/Services/ventas/useServiceVenta';
import { useState } from 'react';
import { useParams } from 'react-router';
import * as Yup from 'yup';

interface IAgregarProductosVentaProps {
    productoId: number;
    closeModal?: () => void;
}
export const useAgregarProductoVenta = (props: IAgregarProductosVentaProps) => {
    const { id } = useParams();
    const ventaId = id !== undefined ? Number(id) : 0;
    const { refetch: refetchCartNumber } = useServiceCountVentaProducto(ventaId);

    const { closeModal, productoId } = props;
    const { isLoading, data } = useServiceShowProducto(productoId);
    const [error, seterror] = useState('');

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

    const handleSuccess = async () => {
        AlertToast({
            type: 'success',
            message: 'Producto guardado exitosamente',
        });

        //refetch shopping cart
        refetchCartNumber();

        if (closeModal) {
            closeModal();
        }
    };

    const mutator = useServiceStoreVentaProducto();
    const { onSubmit } = useOnSubmit<IVentaProductoForm>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async () => handleSuccess(),
        onError: (data: any) => seterror(data?.response?.data.message || data.message),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
        isPending: mutator.isPending,
    };
    return { formikProps, isPending: mutator.isPending, onErrorMessage: error };
};
