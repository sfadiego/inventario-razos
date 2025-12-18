import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IVenta, StatusVenta } from '@/models/venta.interface';
import { useServiceReporteVentaPdf } from '@/Services/pdf/useServicePdf';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { ArrowRight, Eye, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export interface IFiltroVenta {
  nombre_venta: string;
  folio: string;
  cliente_id: number;
  tipo_compra: string;
  status_venta: StatusVenta;
}
export const useVentasPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const [selected, setSelected] = useState(0);
  const { isLoading, data } = useServiceShowVenta(selected);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const { setItem, clearItem } = useSelectedItemStore();
  const navigate = useNavigate();

  const handleNewVentaModal = () => {
    setSelected(0);
    clearItem('venta');
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    clearItem('venta');
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('venta', data);
    }
  }, [isLoading, data, selected, setItem]);

  const printVentaDetail = () => {
    window.alert('imprimiendo ... ');
  };

  const renderersMap = {
    actions: ({ id, status_venta }: IVenta) => (
      <>
        <Button
          onClick={() => {
            openModal();
            setSelected(id!);
          }}
          variant="primary"
          size="sm"
        >
          <Eye />
        </Button>
        <Button className="ml-2" onClick={() => navigate(`/venta/${id}/productos`)} variant="outline" size="sm">
          <ArrowRight />
        </Button>
        {status_venta == 'finalizada' && (
          <Button className="ml-2" onClick={printVentaDetail} variant="info" size="sm">
            <Printer />
          </Button>
        )}
      </>
    ),
  };
  const filters: IFilters<IFiltroVenta>[] = [
    {
      property: 'nombre_venta',
      operator: 'like',
      initialValue: '',
    },
  ];

  const { refetch } = useServiceReporteVentaPdf();
  const handleReporteVenta = async () => {
    setPdfLoading(true);
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      window.open(fileURL, '_blank');
    }
  };

  return {
    renderersMap,
    isOpen,
    filters,
    openModal: handleNewVentaModal,
    closeModal: handleCloseModal,
    handleReporteVenta,
    pdfLoading,
  };
};
