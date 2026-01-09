import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { downloadBlob } from '@/helper/downloadBlob';
import { useServiceCatalogoProductosPdf } from '@/Services/pdf/useServicePdf';
import { useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';

export const useFormProductoCategoria = () => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [categoriaId, setCategoriaId] = useState(0);
  const [printOptions, setPrintOptions] = useState({ printBarcode: true, printImage: true });
  const { printBarcode, printImage } = printOptions;
  const { refetch } = useServiceCatalogoProductosPdf(categoriaId, printBarcode ? 1 : 0, printImage ? 1 : 0);
  const handlePrint = async () => {
    setPdfLoading(true);
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      downloadBlob(data, 'catalogo.pdf');
    }
  };

  const formikProps = {
    initialValues: {
      categoria_id: 0,
      print_barcode: true,
      print_image: true,
    },
    onSubmit: () => handlePrint(),
  };

  const handleChange = (option: SingleValue<IOptions> | MultiValue<IOptions>) => {
    if (!option) return;
    const { value } = option as IOptions;
    setCategoriaId(Number(value));
  };

  return {
    pdfLoading,
    handlePrint,
    formikProps,
    setCategoriaId,
    printOptions,
    setPrintOptions,
    handleChange,
  };
};
