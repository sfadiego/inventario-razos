import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProveedor } from '@/models/proveedor.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceStoreProveedor, useServiceUpdateProveedor } from '@/Services/proveedor/useServiceProveedor';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useProveedorStore } from './useProveedorStore';

interface IUseProveedorProps {
    closeModal?: () => void;
}

export const useProveedor = (props: IUseProveedorProps) => {
    const { closeModal } = props;
    const { proveedor } = useProveedorStore();
    const initialValues: IProveedor = {
        nombre: proveedor?.nombre ?? '',
        observaciones: proveedor?.observaciones ?? '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        observaciones: Yup.string(),
    });

    const queryClient = useQueryClient();
    const handleSuccess = () => {
        if (closeModal) {
            closeModal();
        }

        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Guardado correctamente`,
        });
        queryClient.invalidateQueries({ queryKey: [ApiRoutes.Proveedores] });
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
