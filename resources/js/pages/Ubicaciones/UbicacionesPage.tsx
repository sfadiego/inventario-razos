import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltroUbicaciones } from './partials/FiltroUbicaciones';
import { FormUbicacion } from './partials/FormUbicacion';
import { useUbicacionesPage } from './useUbicacionesPage';

export default function ProovedoresPage() {
    const { initialValues, renderersMap, filters, isOpen, closeModal, openModal, useServiceIndexUbicaciones, refreshUbicacionFlag } =
        useUbicacionesPage();

    return (
        <PageWrapper pageTitle="Ubicaciones">
            <DatatableWithFilter
                propertyInputSearch={`nombre`}
                initialValues={initialValues}
                filters={filters}
                refreshFlag={refreshUbicacionFlag}
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
