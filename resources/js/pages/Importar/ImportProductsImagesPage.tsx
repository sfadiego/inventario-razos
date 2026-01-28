import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { useImportProductsImages } from './useImportProductsImages';

export default function ImportProductsImagesPage() {
  const { onSubmitFile, isPending } = useImportProductsImages();
  return (
    <PageWrapper pageTitle="Importar Imágenes">
      <div className={`grid grid-cols-12 gap-3`}>
        <div className="col-span-12">
          <DropzoneComponent onSubmitFile={onSubmitFile} acceptedType="images" isLoading={isPending} />
        </div>
      </div>
    </PageWrapper>
  );
}
