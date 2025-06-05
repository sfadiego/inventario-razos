import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { useServiceStoreCliente, useServiceUpdateCliente } from '@/Services/clientes/useServiceClientes';
import * as Yup from 'yup';
import { useClienteStore } from './useClienteStore';

interface IuseClienteProps {
    closeModal?: () => void;
}

export const useCliente = (props: IuseClienteProps) => {
    const { closeModal } = props;
    const { cliente, setRefreshFlag } = useClienteStore();
    const initialValues: ICliente = {
        nombre: cliente?.nombre ?? '',
        confiable: cliente?.confiable ?? true,
        observaciones: cliente?.observaciones ?? '',
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
            text: `Cliente guardado correctamente`,
        });
    };
    const mutator = useServiceStoreCliente();
    const mutatorUpdate = useServiceUpdateCliente(cliente?.id ?? 0);
    const { onSubmit } = useOnSubmit<ICliente>({
        mutateAsync: cliente?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
        onSuccess: async () => handleSuccess(),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return { formikProps, isPending: mutator.isPending };
};
