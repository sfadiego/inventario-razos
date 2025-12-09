import { PageWrapper } from '@/components/layout/PageWrapper';
import { DatatableWithFilter } from '@/components/tables/DatatableWithFilter';
import Button from '@/components/ui/button/Button';
import { useErrorReporting } from '@/pages/ErrorReporting/useErrorReporting';
import { useServiceIndexErrorReporting } from '@/Services/errorReporting/useServiceErrorReporting';
import { Download } from 'lucide-react';
import { FiltrosErrorReporting } from './partials/FiltrosErrorReporting';

export default function ErrorReportingPage() {
  const { renderersMap, rowExpansion, filters, openModal, handleReport } = useErrorReporting();
  return (
    <PageWrapper pageTitle="Error Reporting">
      <div className="flex justify-end">
        <Button variant={'outline'} className="mb-2" onClick={handleReport}>
          <Download /> Descarga Backup
        </Button>
      </div>
      <DatatableWithFilter
        disableNewButton
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
