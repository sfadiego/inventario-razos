import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import { useErrorReporting } from '@/pages/ErrorReporting/useErrorReporting';
import { useServiceIndexErrorReporting } from '@/Services/errorReporting/useServiceErrorReporting';
import { FiltrosErrorReporting } from './partials/FiltrosErrorReporting';

export default function ErrorReportingPage() {
  const { renderersMap, rowExpansion, filters, openModal } = useErrorReporting();
  return (
    <PageWrapper pageTitle="Error Reporting">
      <DatatableWithFilter
        disableNewButton
        propertyInputSearch={`nombre`}
        renderersMap={renderersMap}
        filters={filters}
        onClickNew={openModal}
        service={useServiceIndexErrorReporting}
        rowExpansion={rowExpansion}
      >
        {(formik) => <FiltrosErrorReporting formik={formik} />}
      </DatatableWithFilter>
    </PageWrapper>
  );
}
