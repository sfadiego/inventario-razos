import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexReporteMovimiento } from '@/Services/reporteMovimiento/useServiceReporteMovimientos';
import { FiltroMovimientos } from './partials/FiltroMovimientos';
import { FormReporte } from './partials/FormReporte';
import { useReportesPage } from './useReportesPage';

export default function ReportesPage() {
    const { initialValues, filters, isOpen, closeModal, openModal, renderersMap } = useReportesPage();
    return (
        <PageWrapper pageTitle="Reporte de movimientos">
            <DatatableWithFilter
                propertyInputSearch={`producto`}
                initialValues={initialValues}
                filters={filters}
                onClickNew={openModal}
                renderersMap={renderersMap}
                newButtonText={`Crear movimiento`}
                service={useServiceIndexReporteMovimiento}
            >
                {(formik) => <FiltroMovimientos formik={formik} />}
            </DatatableWithFilter>
            <FormReporte isOpen={isOpen} closeModal={closeModal} />
        </PageWrapper>
    );
}
