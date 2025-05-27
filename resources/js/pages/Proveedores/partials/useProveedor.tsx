import { IProveedor } from '@/models/proveedor.interface';
import * as Yup from 'yup';

export const useProveedor = () => {
    const initialValues: IProveedor = {
        nombre: '',
        empresa: '',
        observaciones: '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        empresa: Yup.string(),
        observaciones: Yup.string(),
    });

    const onSubmit = (values) => {
        console.log('Form submitted with values:', values);
        // Handle form submission logic here
    };

    return { initialValues, validationSchema, onSubmit };
};
