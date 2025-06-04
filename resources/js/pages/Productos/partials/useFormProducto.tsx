import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProducto } from '@/models/producto.interface';
import { useServiceStoreProducto, useServiceUpdateProducto } from '@/Services/productos/useServiceProductos';
import { useState } from 'react';
import * as Yup from 'yup';
import { useStoreProducto } from './useProductoStore';

interface IUseProductProps {
    closeModal?: () => void;
}

export const useFormProducto = (props: IUseProductProps) => {
    const { closeModal } = props;
    const { setRefreshFlag, producto } = useStoreProducto();
    const [search, setSearch] = useState<string>('');

    const handleSuccess = (data: IProducto) => {
        const { codigo } = data;
        if (closeModal) {
            closeModal();
        }

        setRefreshFlag();
        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Elemento guardado correctamente : ${codigo} `,
        });
    };

    const initialValues: IProducto = {
        nombre: producto?.nombre ?? '',
        proveedor_id: producto?.proveedor_id ?? 0,
        categoria_id: producto?.categoria_id ?? 0,
        codigo: producto?.codigo ?? '',
        precio_compra: producto?.precio_compra ?? 0,
        precio_venta: producto?.precio_venta ?? 0,
        stock: producto?.stock ?? 0,
        cantidad_minima: producto?.cantidad_minima ?? 0,
        compatibilidad: producto?.compatibilidad ?? '',
        ubicacion_id: producto?.ubicacion_id ?? 0,
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
    const mutatorUpdate = useServiceUpdateProducto(producto?.id ?? 0);
    const { onSubmit } = useOnSubmit<IProducto>({
        mutateAsync: producto?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps, isPending: mutator.isPending, search, setSearch };
};
