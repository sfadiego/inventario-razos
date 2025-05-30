import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IUbicacion } from '@/models/ubicacion.interface';
import { useServiceStoreUbicacion } from '@/Services/ubicaciones/useServiceUbicaciones';
import * as Yup from 'yup';

export interface IFiltrosUbicaciones {
    nombre: string;
}
interface IuseUbicacionProps {
    closeModal?: () => void;
}

export const useUbicacion = ({ closeModal }: IuseUbicacionProps) => {
    const initialValues: IUbicacion = {
        nombre: '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('La ubicacion es obligatorio'),
    });

    const handleSuccess = (data: IUbicacion) => {
        console.log(data);
        // const { codigo } = data;
        if (closeModal) {
            closeModal();
        }
        // setRefreshFlag();
        // AlertSwal({
        //     type: AlertTypeEnum.Success,
        //     title: `Exito`,
        //     text: `Elemento guardado correctamente : ${codigo} `,
        // });
    };
    const mutator = useServiceStoreUbicacion();
    const { onSubmit } = useOnSubmit<IUbicacion>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps };
};
