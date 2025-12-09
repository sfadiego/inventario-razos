import { downloadBlob } from '@/helper/downloadBlob';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useServiceTemplateImport } from '@/Services/descargables/useServiceDescargables';
import { useServiceImportProducts } from '@/Services/importar/useServiceImport';
import { useState } from 'react';

interface IImportProduct {
  file: File;
}

export const useImportProductosPage = () => {
  const [inserted, setInserted] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const mutator = useServiceImportProducts();
  const { onSubmit } = useOnSubmit<IImportProduct>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async ({ duplicates, inserted }) => {
      setInserted(inserted);
      setDuplicates(duplicates);
    },
  });

  const onSubmitFile = (file: File) => onSubmit({ file }, {});

  const { isLoading, data, refetch } = useServiceTemplateImport();
  const handleDonwloadTemplate = () => {
    refetch();
    if (!isLoading && data) {
      downloadBlob(data);
    }
  };
  return {
    onSubmitFile,
    inserted,
    duplicates,
    isPending: mutator.isPending,
    handleDonwloadTemplate,
  };
};
