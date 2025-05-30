import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { FiltroUbicaciones } from './partials/FiltroUbicaciones';
import { FormUbicacion } from './partials/FormUbicacion';
import { useUbicacionesPage } from './useUbicacionesPage';

export default function ProovedoresPage() {
    const { initialValues, filters, isOpen, closeModal, openModal, useServiceIndexUbicaciones } = useUbicacionesPage();

    return (
        <PageWrapper pageTitle="Ubicaciones">
            <DatatableWithFilter
                propertyInputSearch={`nombre`}
                initialValues={initialValues}
                filters={filters}
                onClickNew={openModal}
                service={useServiceIndexUbicaciones}
            >
                {(formik) => <FiltroUbicaciones formik={formik} />}
            </DatatableWithFilter>
            <FormUbicacion isOpen={isOpen} closeModal={closeModal}></FormUbicacion>
        </PageWrapper>
    );
}
