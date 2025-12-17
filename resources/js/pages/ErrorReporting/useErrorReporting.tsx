import { ExpansionErrorReportingDetail } from '@/components/errorReporting/ExpansionErrorReportingDetail';
import { IFilters } from '@/components/filters/modalFilter/types';
import { formatDate } from '@/helper/dates';
import { IErrorReporting } from '@/models/errorReporting';
import { useServiceCreateDump } from '@/Services/errorReporting/useServiceErrorReporting';
import { useState } from 'react';

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
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const { refetch } = useServiceCreateDump();

  const handleReport = async () => {
    setPdfLoading(true);
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      window.open(fileURL, 'download');
    }
  };
  return { renderersMap, rowExpansion, filters, openModal, closeModal, isOpen, handleReport, pdfLoading };
};
