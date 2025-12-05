import { ExpansionErrorReportingDetail } from '@/components/errorReporting/ExpansionErrorReportingDetail';
import { IFilters } from '@/components/filters/modalFilter/types';
import { formatDate } from '@/helper/dates';
import { IErrorReporting } from '@/models/errorReporting';
import { useServiceCreateDump } from '@/Services/errorReporting/useServiceErrorReporting';

export interface IFiltroErrorReporting {
  status_code: string;
  created_at: string;
}

export const useErrorReporting = () => {
  const renderersMap = {
    created_at: (item: IErrorReporting) => formatDate(item.created_at),
  };
  const rowExpansion = {
    content: ({ record }: { record: IErrorReporting }) => <ExpansionErrorReportingDetail record={record} />,
  };

  const filters: IFilters<IFiltroErrorReporting>[] = [
    {
      property: 'status_code',
      operator: 'like',
      initialValue: '500',
    },
    {
      property: 'created_at',
      operator: 'like',
      initialValue: formatDate(new Date().toString()),
    },
  ];
  const openModal = () => {};
  const closeModal = () => {};
  const isOpen = false;

  const { isLoading, data, refetch } = useServiceCreateDump();
  const handleReport = () => {
    refetch();
    if (!isLoading && data) {
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      window.open(fileURL, 'download');
    }
  };
  return { renderersMap, rowExpansion, filters, openModal, closeModal, isOpen, handleReport };
};
