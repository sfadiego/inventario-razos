import { AlertToast } from '@/components/alertToast/AlertToast';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceIndexClientes, useServiceStoreCliente, useServiceUpdateCliente } from '@/Services/clientes/useServiceClientes';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import * as Yup from 'yup';

interface IUseClienteProps {
  closeModal: () => void;
}
export const useCliente = ({ closeModal }: IUseClienteProps) => {
  const { refetch } = useServiceIndexClientes({ nameQuery: '/api/clientes' });
  const { setItem, getItem } = useSelectedItemStore();
  const cliente = getItem('cliente') as ICliente;
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(true);
  const initialValues: ICliente = {
    nombre: cliente?.nombre ?? '',
    confiable: cliente?.confiable ?? true,
    observaciones: cliente?.observaciones ?? '',
    adeudo: cliente?.adeudo ?? 0,
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    confiable: Yup.boolean(),
    observaciones: Yup.string(),
    adeudo: Yup.number().max(0, 'El adeudo debe ser negativo o $0'),
  });
  const queryClient = useQueryClient();
  const handleSuccess = (data: ICliente) => {
    AlertToast({
      type: 'success',
      message: 'Cliente guardado',
    });
    closeModal();
    refetch();
    setItem('cliente', data);
    queryClient.invalidateQueries({ queryKey: [ApiRoutes.Clientes] });
  };
  const mutator = useServiceStoreCliente();
  const mutatorUpdate = useServiceUpdateCliente(cliente?.id ?? 0);
  const { onSubmit } = useOnSubmit<ICliente>({
    mutateAsync: cliente?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async (data) => handleSuccess(data),
  });

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };
  return { formikProps, isPending: mutator.isPending, isCheckedDisabled, setIsCheckedDisabled, newClient: cliente?.id === undefined };
};
