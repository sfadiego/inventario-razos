import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ISubcategoriaForm } from '@/models/subcategoria.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceStoreSubCategorias, useServiceUpdateSubCategoria } from '@/Services/subcategorias/useServiceSubCategorias';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

export const useFormSubcategoria = ({ closeModal }: { closeModal: () => void }) => {
  const { id } = useParams();
  const categoriaId = id ? Number(id) : 0;
  const { getItem } = useSelectedItemStore();
  const subcategoria = getItem('subcategoria');
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    if (closeModal) {
      closeModal();
    }

    AlertSwal({
      title: `Exito`,
      text: `${subcategoria?.id ? 'Actualizado' : 'Guardado'} correctamente`,
    });

    queryClient.invalidateQueries({
      queryKey: [`${ApiRoutes.Categorias}/${categoriaId}/subcategorias`],
    });
  };

  const mutator = useServiceStoreSubCategorias();
  const mutatorUpdate = useServiceUpdateSubCategoria(subcategoria?.id ?? 0);
  const { onSubmit } = useOnSubmit<ISubcategoriaForm>({
    mutateAsync: subcategoria?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => handleSuccess(),
  });

  const formikProps = {
    initialValues: {
      nombre: subcategoria?.nombre ?? '',
      categoria_id: subcategoria?.categoria_id ?? null,
    },
    onSubmit,
    validationSchema: Yup.object().shape({
      nombre: Yup.string().required('El nombre es obligatorio'),
      categoria_id: Yup.number().required('La categoria es obligatoria'),
    }),
  };
  return { formikProps, isPending: mutator.isPending || mutatorUpdate.isPending };
};
