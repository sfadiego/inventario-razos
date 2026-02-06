import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceUpdateProducto } from '@/Services/productos/useServiceProductos';
import { useQueryClient } from '@tanstack/react-query';

interface IUpdateProductImage {
  file: File;
}
export const useFormAgregarImagen = ({ productId, closeModal }: { productId: number; closeModal: () => void }) => {
  const mutator = useServiceUpdateProducto(productId, true);
  const queryClient = useQueryClient();

  const { onSubmit } = useOnSubmit<IUpdateProductImage>({
    mutateAsync: mutator.mutateAsync,
    onError: () =>
      AlertSwal({
        title: 'Error',
        text: 'Error al actualizar imagen',
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.Productos}`] });
      closeModal();
      AlertSwal({
        title: 'Success',
        text: 'Imagen actualizada correctamente',
      });
    },
  });

  const onSubmitFile = (file: File) => {
    const fileToSubmit = Array.isArray(file) ? file[0] : file;
    return onSubmit({ file: fileToSubmit }, {});
  };

  return {
    onSubmit: onSubmitFile,
  };
};
