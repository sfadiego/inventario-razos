import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexSubCategorias } from '@/Services/subcategorias/useServiceSubCategorias';
import { FiltroSubcategoria } from './partials/FiltroSubcategoria';
import { FormSubcategoria } from './partials/FormSubcategoria';
import { useSubcategoriaPage } from './useSubcategoriaPage';

export default function SubcategoriaPage() {
  const { renderersMap, filters, openModal, categoriaId, isOpen, closeModal, breadcrumbArray } = useSubcategoriaPage();

  return (
    <PageWrapper pageTitle="Sub categorías" breadcrumbArray={breadcrumbArray}>
      <DatatableWithFilter
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        payload={{ categoriaId }}
        service={useServiceIndexSubCategorias}
      >
        {(formik) => <FiltroSubcategoria formik={formik} />}
      </DatatableWithFilter>
      <FormSubcategoria isOpen={isOpen} closeModal={closeModal} />
    </PageWrapper>
  );
}
