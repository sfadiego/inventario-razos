import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { MAX_FILE_LIMIT, MAX_SIZE_MB } from '@/components/dropzone/useDropzoneComponent';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Badge from '@/components/ui/badge/Badge';
import { useImportProductsImages } from './useImportProductsImages';

export default function ImportProductsImagesPage() {
  const { onSubmitFile, isPending } = useImportProductsImages();
  return (
    <PageWrapper pageTitle="Importar Imágenes">
      <div className={`grid grid-cols-12 gap-3`}>
        <div className="col-span-12">
          <Badge variant="light" color="warning">
            Máximo {MAX_FILE_LIMIT} archivos, {MAX_SIZE_MB}MB por subida
          </Badge>
        </div>
        <div className="col-span-12">
          <DropzoneComponent onSubmitFile={onSubmitFile} acceptedType="images" isLoading={isPending} />
        </div>
      </div>
    </PageWrapper>
  );
}
