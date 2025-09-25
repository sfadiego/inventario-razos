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
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.Productos}`] });
      closeModal();
    },
  });

  const onSubmitFile = (file: File) => onSubmit({ file }, {});

  return {
    onSubmit: onSubmitFile,
  };
};
