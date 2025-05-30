import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
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
        if (closeModal) {
            closeModal();
        }

        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Ubicacion guardado correctamente`,
        });
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
