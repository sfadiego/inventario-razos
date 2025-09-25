import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { FormAgregarImagen } from './partials/AgregarImagen/FormAgregarImagen';
import { FiltrosProductos } from './partials/FiltrosProductos';
import { FormProducto } from './partials/FormProducto';
import { useProductosPage } from './useProductosPage';

export default function ProductosPage() {
  const { filters, openModal, renderersMap, isOpen, closeModal, useServiceIndexProductos, rowExpansion, isOpenNewImage, closeModalNewImage } =
    useProductosPage();
  return (
    <>
      <PageWrapper pageTitle="Productos">
        <DatatableWithFilter
          propertyInputSearch={`nombre`}
          renderersMap={renderersMap}
          filters={filters}
          onClickNew={openModal}
          service={useServiceIndexProductos}
          rowExpansion={rowExpansion}
        >
          {(formik) => <FiltrosProductos formik={formik} />}
        </DatatableWithFilter>
        <FormProducto isOpen={isOpen} closeModal={closeModal}></FormProducto>
        <FormAgregarImagen isOpen={isOpenNewImage} closeModal={closeModalNewImage} />
      </PageWrapper>
    </>
  );
}
