import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useServiceImportProductImages } from '@/Services/importar/useServiceImport';

export const useImportProductsImages = () => {
  const mutator = useServiceImportProductImages();
  const { onSubmit } = useOnSubmit({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async ({ assigned, invalid }: { assigned: string[]; invalid: string[] }) =>
      AlertSwal({
        title: `Exito`,
        text: 'Importación completada',
        options: {
          html: `<p><b>Asignados</b>: ${assigned.join(', ')}</p><p><b>Inválidos</b>: ${invalid.join(', ')}</p>`,
        },
      }),
  });

  const onSubmitFile = (file: File | File[]) => {
    const files = Array.isArray(file) ? file : [file];
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file[]', file);
    });

    onSubmit(formData, {});
  };

  return {
    onSubmitFile,
    isPending: mutator.isPending,
  };
};
