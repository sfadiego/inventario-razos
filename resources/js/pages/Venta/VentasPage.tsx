import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexVenta } from '@/Services/ventas/useServiceVenta';
import { FiltrosVenta } from './partials/FiltrosVenta';
import { useVentasPage } from './useVentasPage';

export default function VentasPage() {
    const { openModal, filters, renderersMap, initialValues } = useVentasPage();

    return (
        <PageWrapper pageTitle="Ventas">
            <DatatableWithFilter
                propertyInputSearch={`folio`}
                newButtonText={`Venta`}
                renderersMap={renderersMap}
                initialValues={initialValues}
                filters={filters}
                onClickNew={() => openModal}
                refreshFlag={false}
                service={useServiceIndexVenta}
            >
                {(formik) => <FiltrosVenta formik={formik} />}
            </DatatableWithFilter>
        </PageWrapper>
    );
}
