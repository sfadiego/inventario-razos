import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IUbicacion } from '@/models/ubicacion.interface';
import { useServiceStoreUbicacion, useServiceUpdateUbicacion } from '@/Services/ubicaciones/useServiceUbicaciones';
import * as Yup from 'yup';
import { useUbicacionStore } from './useUbicacionStore';

export interface IFiltrosUbicaciones {
    nombre: string;
}
interface IuseUbicacionProps {
    closeModal?: () => void;
}

export const useUbicacion = ({ closeModal }: IuseUbicacionProps) => {
    const { ubicacion, setRefreshFlag } = useUbicacionStore();
    const initialValues: IUbicacion = {
        nombre: ubicacion?.nombre ?? '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('La ubicacion es obligatorio'),
    });

    const handleSuccess = () => {
        if (closeModal) {
            closeModal();
        }
        setRefreshFlag();
        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Ubicacion guardada correctamente`,
        });
    };
    const mutator = useServiceStoreUbicacion();
    const mutatorUpdate = useServiceUpdateUbicacion(ubicacion?.id ?? 0);
    const { onSubmit } = useOnSubmit<IUbicacion>({
        mutateAsync: ubicacion?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
        onSuccess: async () => handleSuccess(),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps };
};
