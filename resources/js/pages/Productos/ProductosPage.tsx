import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import Button from '@/components/ui/button/Button';
import '@mantine/core/styles.layer.css';
import { Loader, Printer } from 'lucide-react';
import 'mantine-datatable/styles.layer.css';
import { FormAgregarImagen } from './partials/AgregarImagen/FormAgregarImagen';
import { FiltrosProductos } from './partials/FiltrosProductos';
import { FormProducto } from './partials/FormProducto';
import { useProductosPage } from './useProductosPage';

export default function ProductosPage() {
  const {
    productId,
    filters,
    openModal,
    renderersMap,
    isOpen,
    closeModal,
    useServiceIndexProductos,
    rowExpansion,
    isOpenNewImage,
    closeModalNewImage,
    handlePrint,
    pdfLoading,
  } = useProductosPage();

  return (
    <>
      <PageWrapper pageTitle="Productos">
        <div className="flex justify-end">
          <Button variant={'outline'} className="mb-2" disabled={pdfLoading} onClick={handlePrint}>
            <Printer /> {pdfLoading ? <Loader /> : 'Descargar Reporte'}
          </Button>
        </div>
        <DatatableWithFilter
          renderersMap={renderersMap}
          filters={filters}
          onClickNew={openModal}
          service={useServiceIndexProductos}
          rowExpansion={rowExpansion}
        >
          {(formik) => <FiltrosProductos formik={formik} />}
        </DatatableWithFilter>
        <FormProducto isOpen={isOpen} closeModal={closeModal} />
        <FormAgregarImagen productId={productId} isOpen={isOpenNewImage} closeModal={closeModalNewImage} />
      </PageWrapper>
    </>
  );
}
