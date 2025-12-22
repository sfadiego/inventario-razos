import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexVenta } from '@/Services/ventas/useServiceVenta';
import { Files } from 'lucide-react';
import { FiltrosVenta } from './partials/FiltrosVenta';
import { FormVenta } from './partials/FormVenta';
import { FormReporteVenta } from './partials/ReporteVenta/FormReporteVenta';
import { useVentasPage } from './useVentasPage';

export default function VentasPage() {
  const { openModal, closeModal, isOpen, filters, renderersMap } = useVentasPage();
  const { isOpen: isOpenReporteVenta, openModal: openModalReporteVenta, closeModal: closeModalReporteVenta } = useModal();
  return (
    <PageWrapper pageTitle="Ventas">
      <div className="flex justify-end">
        <Button variant={'outline'} className="mb-2" onClick={openModalReporteVenta}>
          <Files /> Generar Reporte
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
      <FormReporteVenta closeModal={closeModalReporteVenta} isOpen={isOpenReporteVenta} />
    </PageWrapper>
  );
}
