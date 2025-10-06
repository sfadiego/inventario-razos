import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useServiceIndexVenta } from '@/Services/ventas/useServiceVenta';
import { FiltrosVenta } from './partials/FiltrosVenta';
import { FormVenta } from './partials/FormVenta';
import { useVentasPage } from './useVentasPage';

export default function VentasPage() {
  const { openModal, closeModal, isOpen, filters, renderersMap } = useVentasPage();
  return (
    <PageWrapper pageTitle="Ventas">
      <DatatableWithFilter
        propertyInputSearch={`nombre_venta`}
        newButtonText={`Venta`}
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexVenta}
      >
        {(formik) => <FiltrosVenta formik={formik} />}
      </DatatableWithFilter>
      <FormVenta closeModal={closeModal} isOpen={isOpen}></FormVenta>
    </PageWrapper>
  );
}
