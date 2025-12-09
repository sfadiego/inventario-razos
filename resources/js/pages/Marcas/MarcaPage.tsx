import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useMarcaPage } from '@/pages/Marcas/useMarcaPage';
import { useServiceIndexMarcas } from '@/Services/marcas/useServiceMarcas';
import { FiltrosMarca } from './partials/FiltrosMarca';
import { FormMarca } from './partials/FormMarca';

export default function MarcaPage() {
  const { renderersMap, filters, openModal, isOpen, closeModal } = useMarcaPage();
  return (
    <PageWrapper pageTitle="Marcas">
      <DatatableWithFilter
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexMarcas}
      >
        {(formik) => <FiltrosMarca formik={formik} />}
      </DatatableWithFilter>
      <FormMarca isOpen={isOpen} closeModal={closeModal} />
    </PageWrapper>
  );
}
