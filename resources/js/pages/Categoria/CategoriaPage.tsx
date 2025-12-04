import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { useCategoriaPage } from './useCategoriaPage';

export default function CategoriaPage() {
  const { renderersMap, filters, openModal } = useCategoriaPage();

  return (
    <PageWrapper pageTitle="Categorias">
      <DatatableWithFilter
        disableNewButton={true}
        propertyInputSearch={`nombre`}
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexCategorias}
      >
        <></>
      </DatatableWithFilter>
    </PageWrapper>
  );
}
