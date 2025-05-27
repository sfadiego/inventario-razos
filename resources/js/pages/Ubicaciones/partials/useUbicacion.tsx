import { IUbicacion } from '@/models/ubicacion.interface';
import * as Yup from 'yup';

export const useUbicacion = () => {
    const initialValues: IUbicacion = {
        nombre: '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
    });

    const onSubmit = (values) => {
        console.log('Form submitted with values:', values);
        // Handle form submission logic here
    };

    return { initialValues, validationSchema, onSubmit };
};
