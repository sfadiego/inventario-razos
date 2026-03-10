import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexDevoluciones } from '@/Services/devoluciones/useServiceDevoluciones';
import { FormDevolucion } from './partials/FormDevolucion';
import { useDevolucionesPage } from './useDevolucionesPage';

export default function DevolucionesPage() {
  const { filters, isOpen, closeModal, openModal, renderersMap, ventaId } = useDevolucionesPage();
  return (
    <PageWrapper pageTitle="Devoluciones">
      <></>
      <DatatableWithFilter
        filters={filters}
        onClickNew={openModal}
        renderersMap={renderersMap}
        newButtonText={`Crear Devolucion`}
        disableNewButton={true}
        service={useServiceIndexDevoluciones}
        payload={{ order: 'desc' }}
      >
        {() => <></>}
      </DatatableWithFilter>
      <FormDevolucion ventaId={ventaId} isOpen={isOpen} onClose={closeModal} />
    </PageWrapper>
  );
}
