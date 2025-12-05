import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Alert from '@/components/ui/alert/Alert';
import { useImportProductosPage } from './useImportProductosPage';

export default function ImportProductsPage() {
  const { inserted, duplicates, isPending, onSubmitFile } = useImportProductosPage();
  return (
    <PageWrapper pageTitle="Importar Productos">
      <div className={`grid grid-cols-12 gap-3`}>
        <div className="col-span-12">
          <Alert
            title="Instrucciones"
            variant="info"
            message="El archivo debe ser un archivo .xlsx o .xls con las columnas: Codigo,	Cantidad,	Descripcion,	Marca,	subcategoria"
            showLink={true}
            linkHref="/plantilla-importacion.xlsx"
            linkText="Descargar plantilla"
          />
        </div>
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
          <DropzoneComponent onSubmitFile={onSubmitFile} acceptedType="documents" isLoading={isPending} />
        </div>
      </div>
    </PageWrapper>
  );
}
