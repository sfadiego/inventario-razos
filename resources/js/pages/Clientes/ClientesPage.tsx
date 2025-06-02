import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltrosCliente } from './partials/FiltrosCliente';
import { useClientesPage } from './useClientesPage';

export default function ClientesPage() {
    const { useServiceIndexClientes, renderersMap, initialValues, filters, openModal } = useClientesPage();

    return (
        <PageWrapper pageTitle="Clientes">
            <DatatableWithFilter
                propertyInputSearch={`nombre`}
                initialValues={initialValues}
                renderersMap={renderersMap}
                filters={filters}
                onClickNew={openModal}
                service={useServiceIndexClientes}
            >
                {(formik) => <FiltrosCliente formik={formik} />}
            </DatatableWithFilter>
        </PageWrapper>
    );
}
