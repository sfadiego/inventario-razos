import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltrosProveedor } from './partials/FiltrosProveedor';
import { FormProveedor } from './partials/FormProveedor';
import { useProveedoresPage } from './useProveedoresPage';

export default function ProveedoresPage() {
    const { renderersMap, filters, isOpen, openModal, closeModal, useServiceIndexProveedor } = useProveedoresPage();

    return (
        <PageWrapper pageTitle="Proveedores">
            <DatatableWithFilter
                renderersMap={renderersMap}
                propertyInputSearch={`nombre`}
                filters={filters}
                onClickNew={openModal}
                service={useServiceIndexProveedor}
            >
                {(formik) => <FiltrosProveedor formik={formik} />}
            </DatatableWithFilter>
            <FormProveedor isOpen={isOpen} closeModal={closeModal}></FormProveedor>
        </PageWrapper>
    );
}
