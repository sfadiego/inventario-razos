import { AlertToast } from '@/components/alertToast/AlertToast';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProducto } from '@/models/producto.interface';
import { useServiceStoreProducto } from '@/Services/productos/useServiceProductos';
import * as Yup from 'yup';

interface IUseProductProps {
    closeModal?: () => void;
}

export const useProduct = ({ closeModal }: IUseProductProps) => {
    const handleSuccess = (data: IProducto) => {
        const { nombre, codigo } = data;
        if (closeModal) {
            closeModal();
        }

        AlertToast({
            type: 'success',
            message: `${nombre} guardado correctamente : ${codigo} `,
        });
    };
    const initialValues: IProducto = {
        nombre: '',
        proveedor_id: 0,
        categoria_id: 0,
        codigo: '',
        precio_compra: 0,
        precio_venta: 0,
        stock: 0,
        cantidad_minima: 0,
        compatibilidad: '',
        ubicacion_id: 0,
        activo: true,
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        proveedor_id: Yup.number().min(1, 'Seleccione un proveedor').required('El proveedor es obligatorio'),
        categoria_id: Yup.number().min(1, 'Seleccione una categoría').required('La categoría es obligatoria'),
        codigo: Yup.string(),
        precio_compra: Yup.number().min(1, 'Debe ser mayor o igual a $1').required('El precio de compra es obligatorio'),
        precio_venta: Yup.number().min(1, 'Debe ser mayor o igual a $1').required('El precio de venta es obligatorio'),
        stock: Yup.number().min(0, 'Debe ser mayor o igual a 1').required('El stock es obligatorio'),
        cantidad_minima: Yup.number().min(1, 'Debe ser mayor o igual a 1').required('La cantidad mínima es obligatoria'),
        compatibilidad: Yup.string(),
        ubicacion_id: Yup.number().min(1, 'Seleccione una ubicación').required('La ubicación es obligatoria'),
        activo: Yup.boolean(),
    });

    const mutator = useServiceStoreProducto();
    const { onSubmit } = useOnSubmit<IProducto>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    return { initialValues, validationSchema, onSubmit, isPending: mutator.isPending };
};
