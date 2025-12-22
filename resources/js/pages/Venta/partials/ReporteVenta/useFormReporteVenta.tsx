import { formatDate } from '@/helper/dates';
import { useServiceReporteVentaPdf } from '@/Services/pdf/useServicePdf';

import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';

export const useFormReporteVenta = () => {
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const [selectedFechaInicio, setSelectedFechaInicio] = useState<string>('');
  const [selectedFechaFin, setSelectedFechaFin] = useState<string>('');

  const initialValues = {
    fechaInicio: formatDate(new Date().toString()),
    fechaFin: formatDate(new Date().toString()),
  };

  const validationSchema = Yup.object().shape({
    fechaInicio: Yup.string().required('La fecha es obligatoria'),
    fechaFin: Yup.string().required('La fecha es obligatoria'),
  });

  const { refetch } = useServiceReporteVentaPdf(selectedFechaInicio, selectedFechaFin);

  const download = useCallback(async () => {
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      window.open(fileURL, '_blank');
    }
  }, [refetch]);

  useEffect(() => {
    if (selectedFechaFin && selectedFechaInicio) {
      download();
    }
  }, [selectedFechaInicio, selectedFechaFin, download]);

  const onSubmit = async (postData: any) => {
    const { fechaInicio, fechaFin } = postData;
    setSelectedFechaInicio(fechaInicio);
    setSelectedFechaFin(fechaFin);
  };

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return {
    formikProps,
    pdfLoading,
  };
};
