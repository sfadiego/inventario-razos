import { useServiceStoreMarca } from '@/Services/marcas/useServiceMarcas';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IMarca } from '@/models/marca.interface';
import * as Yup from 'yup';

export const useMarcaForm = ({ closeModal }: { closeModal: () => void }) => {
  const initialValues: IMarca = {
    nombre: '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
  });

  const handleSuccess = (data: IMarca) => {
    console.log(data);
  };

  const mutator = useServiceStoreMarca();
  //   const mutatorUpdate = useServiceUpdateMarca(cliente?.id ?? 0);
  const { onSubmit } = useOnSubmit<IMarca>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async (data) => handleSuccess(data),
  });

  const formikProps = {
    initialValues,
    onSubmit,
    validationSchema,
  };

  return { formikProps, closeModal, isPending: mutator.isPending };
};
