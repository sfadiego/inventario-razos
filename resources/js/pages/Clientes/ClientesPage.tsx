import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltrosCliente } from './partials/FiltrosCliente';
import { useClientesPage } from './useClientesPage';

export default function ClientesPage() {
    const { useServiceIndexClientes, renderersMap, initialValues, filters, openModal, refreshClienteFlag } = useClientesPage();

    return (
        <PageWrapper pageTitle="Clientes">
            <DatatableWithFilter
                refreshFlag={refreshClienteFlag}
                propertyInputSearch={`nombre`}
                initialValues={initialValues}
                renderersMap={renderersMap}
                filters={filters}
                disableNewButton={true}
                onClickNew={openModal}
                service={useServiceIndexClientes}
            >
                {(formik) => <FiltrosCliente formik={formik} />}
            </DatatableWithFilter>
        </PageWrapper>
    );
}
