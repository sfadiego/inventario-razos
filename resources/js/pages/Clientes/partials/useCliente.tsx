import { AlertToast } from '@/components/alertToast/AlertToast';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ICliente } from '@/models/cliente.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceIndexClientes, useServiceStoreCliente, useServiceUpdateCliente } from '@/Services/clientes/useServiceClientes';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import * as Yup from 'yup';
import { useClienteStore } from './useClienteStore';

interface IUseClienteProps {
  closeModal: () => void;
}
export const useCliente = ({ closeModal }: IUseClienteProps) => {
  const { cliente, setSelectedCliente } = useClienteStore();
  const { refetch } = useServiceIndexClientes({ nameQuery: '/api/clientes' });
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(true);
  const initialValues: ICliente = {
    nombre: cliente?.nombre ?? '',
    confiable: cliente?.confiable ?? true,
    observaciones: cliente?.observaciones ?? '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    confiable: Yup.boolean(),
    observaciones: Yup.string(),
  });
  const queryClient = useQueryClient();
  const handleSuccess = (data: ICliente) => {
    AlertToast({
      type: 'success',
      message: 'Cliente guardado',
    });
    closeModal();
    refetch();
    setSelectedCliente(data);
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
  return { formikProps, isPending: mutator.isPending, isCheckedDisabled, setIsCheckedDisabled };
};
