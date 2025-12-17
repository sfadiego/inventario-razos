import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import Button from '@/components/ui/button/Button';
import { useServiceIndexVenta } from '@/Services/ventas/useServiceVenta';
import { Download, Loader } from 'lucide-react';
import { FiltrosVenta } from './partials/FiltrosVenta';
import { FormVenta } from './partials/FormVenta';
import { useVentasPage } from './useVentasPage';

export default function VentasPage() {
  const { openModal, closeModal, isOpen, filters, renderersMap, handleReporteVenta, pdfLoading } = useVentasPage();
  return (
    <PageWrapper pageTitle="Ventas">
      <div className="flex justify-end">
        <Button variant={'outline'} className="mb-2" onClick={handleReporteVenta} disabled={pdfLoading}>
          <Download /> {pdfLoading ? <Loader /> : 'Descarga Reporte'}
        </Button>
      </div>
      <DatatableWithFilter
        newButtonText={`Venta`}
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexVenta}
      >
        {(formik) => <FiltrosVenta formik={formik} />}
      </DatatableWithFilter>
      <FormVenta closeModal={closeModal} isOpen={isOpen} />
    </PageWrapper>
  );
}
