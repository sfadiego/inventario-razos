import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { FiltrosProductos } from './partials/FiltrosProductos';
import { FormProducto } from './partials/FormProducto';
import { useProductosPage } from './useProductosPage';

export default function ProductosPage() {
    const { filters, openModal, renderersMap, isOpen, closeModal, initialValues, useServiceIndexProductos } = useProductosPage();
    return (
        <>
            <PageWrapper pageTitle="Productos">
                <DatatableWithFilter
                    propertyInputSearch={`nombre`}
                    renderersMap={renderersMap}
                    initialValues={initialValues}
                    filters={filters}
                    onClickNew={openModal}
                    service={useServiceIndexProductos}
                >
                    {(formik) => <FiltrosProductos formik={formik} />}
                </DatatableWithFilter>
                <FormProducto isOpen={isOpen} closeModal={closeModal}></FormProducto>
            </PageWrapper>
        </>
    );
}
