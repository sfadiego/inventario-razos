import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { downloadBlob } from '@/helper/downloadBlob';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useServiceTemplateImport } from '@/Services/descargables/useServiceDescargables';
import { useServiceImportProducts } from '@/Services/importar/useServiceImport';
import { useState } from 'react';

export const useImportProductosPage = () => {
  const [inserted, setInserted] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [plantillaLoading, setPlantillaLoading] = useState<boolean>(false);
  const mutator = useServiceImportProducts();
  const { onSubmit } = useOnSubmit({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async ({ duplicates, inserted }) => {
      setInserted(inserted);
      setDuplicates(duplicates);
      AlertSwal({
        title: `Exito`,
        text: 'Importación completada',
      });
    },
  });

  const onSubmitFile = (file: File | File[]) => {
    const fileToSubmit = Array.isArray(file) ? file[0] : file;
    onSubmit({ file: fileToSubmit }, {});
  };

  const { refetch } = useServiceTemplateImport();
  const handleDonwloadTemplate = async () => {
    setPlantillaLoading(true);
    const { data } = await refetch();
    if (data) {
      setPlantillaLoading(false);
      downloadBlob(data, 'plantilla.xlsx');
    }
  };

  return {
    onSubmitFile,
    inserted,
    duplicates,
    isPending: mutator.isPending,
    plantillaLoading,
    handleDonwloadTemplate,
  };
};
