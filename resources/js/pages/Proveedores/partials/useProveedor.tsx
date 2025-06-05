import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProveedor } from '@/models/proveedor.interface';
import { useServiceStoreProveedor, useServiceUpdateProveedor } from '@/Services/proveedor/useServiceProveedor';
import * as Yup from 'yup';
import { useProveedorStore } from './useProveedorStore';

interface IUseProveedorProps {
    closeModal?: () => void;
}

export const useProveedor = (props: IUseProveedorProps) => {
    const { closeModal } = props;
    const { proveedor, setRefreshFlag } = useProveedorStore();
    const initialValues: IProveedor = {
        nombre: proveedor?.nombre ?? '',
        empresa: proveedor?.empresa ?? '',
        observaciones: proveedor?.observaciones ?? '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        empresa: Yup.string(),
        observaciones: Yup.string(),
    });

    const handleSuccess = () => {
        if (closeModal) {
            closeModal();
        }

        setRefreshFlag();
        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Proveedor guardado correctamente`,
        });
    };
    const mutator = useServiceStoreProveedor();
    const mutatorUpdate = useServiceUpdateProveedor(proveedor?.id ?? 0);
    const { onSubmit } = useOnSubmit<IProveedor>({
        mutateAsync: proveedor?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
        onSuccess: async () => handleSuccess(),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps, isPending: mutator.isPending };
};
