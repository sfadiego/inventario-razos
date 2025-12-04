import { useServiceStoreMarca, useServiceUpdateMarca } from '@/Services/marcas/useServiceMarcas';
import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IMarca } from '@/models/marca.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';

export const useMarcaForm = ({ closeModal }: { closeModal: () => void }) => {
  const { getItem } = useSelectedItemStore();
  const marca = getItem('marca');
  const initialValues: IMarca = {
    nombre: marca?.nombre ?? '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
  });

  const queryClient = useQueryClient();
  const handleSuccess = () => {
    if (closeModal) {
      closeModal();
    }

    AlertSwal({
      title: `Exito`,
      text: `${marca?.id ? 'Actualizado' : 'Guardado'} correctamente`,
    });

    queryClient.invalidateQueries({
      queryKey: [`${ApiRoutes.Marcas}`],
    });
  };

  const mutator = useServiceStoreMarca();
  const mutatorUpdate = useServiceUpdateMarca(marca?.id ?? 0);
  const { onSubmit } = useOnSubmit<IMarca>({
    mutateAsync: marca?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => handleSuccess(),
  });

  const formikProps = {
    initialValues,
    onSubmit,
    validationSchema,
  };

  return { formikProps, closeModal, isPending: mutator.isPending || mutatorUpdate.isPending };
};
