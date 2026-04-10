import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertToast } from '@/components/alertToast/AlertToast';
import { validateFiles } from '@/components/dropzone/useDropzoneComponent';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useServiceImportProductImages } from '@/Services/importar/useServiceImport';

export const useImportProductsImages = () => {
  const mutator = useServiceImportProductImages();
  const { onSubmit } = useOnSubmit({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async () =>
      AlertSwal({
        title: `Exito`,
        text: 'Importación completada',
      }),
  });

  const onSubmitFile = async (file: File | File[]) => {
    try {
      const files = Array.isArray(file) ? file : [file];
      const isValid = validateFiles(files);
      if (!isValid) {
        return;
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file[]', file);
      });

      await onSubmit(formData, {});
    } catch {
      AlertToast({ type: 'error', message: 'No se puede subir los archivos seleccionados' });
    }
  };

  return {
    onSubmitFile,
    isPending: mutator.isPending,
  };
};
