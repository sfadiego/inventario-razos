import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { useServiceStoreCliente } from '@/Services/clientes/useServiceClientes';
import * as Yup from 'yup';

interface IuseClienteProps {
    closeModal?: () => void;
}

export const useCliente = (props: IuseClienteProps) => {
    const { closeModal } = props;
    const initialValues: ICliente = {
        nombre: '',
        confiable: true,
        observaciones: '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        empresa: Yup.string(),
        observaciones: Yup.string(),
    });

    const handleSuccess = (data: ICliente) => {
        if (closeModal) {
            closeModal();
        }

        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Cliente guardado correctamente`,
        });
    };
    const mutator = useServiceStoreCliente();
    const { onSubmit } = useOnSubmit<ICliente>({
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
