import { IProducto } from '@/models/Products/producto.interface';
import * as Yup from 'yup';

export const useProduct = () => {
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
        codigo: Yup.string().required('El código es obligatorio'),
        precio_compra: Yup.number().min(0, 'Debe ser mayor o igual a 0').required('El precio de compra es obligatorio'),
        precio_venta: Yup.number().min(0, 'Debe ser mayor o igual a 0').required('El precio de venta es obligatorio'),
        stock: Yup.number().min(0, 'Debe ser mayor o igual a 0').required('El stock es obligatorio'),
        cantidad_minima: Yup.number().min(0, 'Debe ser mayor o igual a 0').required('La cantidad mínima es obligatoria'),
        compatibilidad: Yup.string(),
        ubicacion_id: Yup.number().min(1, 'Seleccione una ubicación').required('La ubicación es obligatoria'),
        activo: Yup.boolean(),
    });

    const onSubmit = (values) => {
        console.log('Form submitted with values:', values);
        // Handle form submission logic here
    };

    return { initialValues, validationSchema, onSubmit };
};
