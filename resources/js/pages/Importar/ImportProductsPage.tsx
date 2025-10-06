import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Alert from '@/components/ui/alert/Alert';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { useServiceImportProducts } from '@/Services/importar/useServiceImport';
import { useState } from 'react';

interface IImportProduct {
  file: File;
}

export default function ImportProductsPage() {
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
  return (
    <PageWrapper pageTitle="Importar Productos">
      <div className={`grid grid-cols-12 gap-3`}>
        {inserted.length > 0 && (
          <div className="col-span-12">
            <Alert title={`Insertados (${inserted.length})`} message={inserted.join(', ')} variant="success" />
          </div>
        )}
        {duplicates.length > 0 && (
          <div className="col-span-12">
            <Alert title={`Duplicados (${duplicates.length})`} message={duplicates.join(', ')} variant="warning" />
          </div>
        )}
        <div className="col-span-12">
          <DropzoneComponent onSubmitFile={onSubmitFile} acceptedType="documents" isLoading={mutator.isPending} />
        </div>
      </div>
    </PageWrapper>
  );
}
