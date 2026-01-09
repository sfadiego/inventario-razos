import { formatDate } from '@/helper/dates';
import { downloadBlob } from '@/helper/downloadBlob';
import { useServiceReporteVentaPdf } from '@/Services/pdf/useServicePdf';

import { useCallback, useState } from 'react';

export const useFormReporteVenta = () => {
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date().toString()));

  const { refetch } = useServiceReporteVentaPdf(selectedDate);

  const download = useCallback(async () => {
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      downloadBlob(data, 'reporte.pdf');
    }
  }, [refetch]);

  return {
    download,
    pdfLoading,
    setSelectedDate,
  };
};
