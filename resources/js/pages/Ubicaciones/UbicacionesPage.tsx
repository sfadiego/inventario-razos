import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltroUbicaciones } from './partials/FiltroUbicaciones';
import { FormUbicacion } from './partials/FormUbicacion';
import { useUbicacionesPage } from './useUbicacionesPage';

export default function ProovedoresPage() {
  const { renderersMap, filters, isOpen, closeModal, openModal, useServiceIndexUbicaciones } = useUbicacionesPage();

  return (
    <PageWrapper pageTitle="Ubicaciones">
      <DatatableWithFilter
        propertyInputSearch={`nombre`}
        filters={filters}
        onClickNew={openModal}
        renderersMap={renderersMap}
        service={useServiceIndexUbicaciones}
      >
        {(formik) => <FiltroUbicaciones formik={formik} />}
      </DatatableWithFilter>
      <FormUbicacion isOpen={isOpen} closeModal={closeModal}></FormUbicacion>
    </PageWrapper>
  );
}
