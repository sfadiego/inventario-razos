import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function ImportProductsImagesPage() {
  const onSubmitFile = () => {};
  //   const mutator = useServiceImportProducts();
  //   const { onSubmit } = useOnSubmit<IImportProduct>({
  //     mutateAsync: mutator.mutateAsync,
  //     onSuccess: async () => {
  //     //   setInserted(inserted);
  //     //   setDuplicates(duplicates);
  //     },
  //   });

  //   const onSubmitFile = (file: File) => onSubmit({ file }, {});
  const isPending = false;
  return (
    <PageWrapper pageTitle="Importar Productos">
      <div className={`grid grid-cols-12 gap-3`}>
        <div className="col-span-12">
          <DropzoneComponent onSubmitFile={onSubmitFile} acceptedType="images" isLoading={isPending} />
        </div>
      </div>
    </PageWrapper>
  );
}
