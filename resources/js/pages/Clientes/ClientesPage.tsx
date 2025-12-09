import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltrosCliente } from './partials/FiltrosCliente';
import { FormCliente } from './partials/FormCliente';
import { useClientesPage } from './useClientesPage';

export default function ClientesPage() {
  const { useServiceIndexClientes, renderersMap, filters, openModal, closeModal, isOpen } = useClientesPage();

  return (
    <PageWrapper pageTitle="Clientes">
      <DatatableWithFilter
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexClientes}
      >
        {(formik) => <FiltrosCliente formik={formik} />}
      </DatatableWithFilter>
      <FormCliente isOpen={isOpen} closeModal={closeModal} />
    </PageWrapper>
  );
}
