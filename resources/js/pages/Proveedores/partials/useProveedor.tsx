import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProveedor } from '@/models/proveedor.interface';
import { useServiceStoreProveedor } from '@/Services/proveedor/useServiceProveedor';
import * as Yup from 'yup';

interface IUseProveedorProps {
    closeModal?: () => void;
}

export const useProveedor = (props: IUseProveedorProps) => {
    const { closeModal } = props;
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

    const handleSuccess = (data: IProveedor) => {
        if (closeModal) {
            closeModal();
        }

        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Proveedor guardado correctamente`,
        });
    };
    const mutator = useServiceStoreProveedor();
    const { onSubmit } = useOnSubmit<IProveedor>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps, isPending: mutator.isPending };
};
