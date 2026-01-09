import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import '@mantine/core/styles.layer.css';
import { Printer } from 'lucide-react';
import 'mantine-datatable/styles.layer.css';
import { FormAgregarImagen } from './partials/AgregarImagen/FormAgregarImagen';
import { FiltrosProductos } from './partials/FiltrosProductos';
import { FormProducto } from './partials/FormProducto';
import { FormProductoCategoria } from './partials/ModalFormato/FormProductoCategoria';
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
  } = useProductosPage();

  const { isOpen: isOpenFormato, openModal: openModalFormato, closeModal: closeModalFormato } = useModal();
  return (
    <>
      <PageWrapper pageTitle="Productos">
        <div className="flex justify-end">
          <Button variant={'outline'} className="mb-2" onClick={openModalFormato}>
            <Printer /> Generar Reporte
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
        <FormProductoCategoria isOpen={isOpenFormato} closeModal={closeModalFormato} />
        <FormAgregarImagen productId={productId} isOpen={isOpenNewImage} closeModal={closeModalNewImage} />
      </PageWrapper>
    </>
  );
}
