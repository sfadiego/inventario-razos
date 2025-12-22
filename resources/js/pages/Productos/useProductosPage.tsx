import { IFilters } from '@/components/filters/modalFilter/types';
import { ExpansionProductoDetail } from '@/components/productos/ExpansionProductoDetail';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceCatalogoProductosPdf } from '@/Services/pdf/useServicePdf';
import { useServiceIndexProductos, useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { Camera, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface IFiltroProducto {
  nombre?: string;
  proveedor_id?: number;
  categoria_id?: number;
}

export const useProductosPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const { openModal: openModalNewImage, isOpen: isOpenNewImage, closeModal: closeModalNewImage } = useModal();
  const [productId, setProductId] = useState<number>(0);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);
  const { isLoading, data } = useServiceShowProducto(productId);
  const { setItem, clearItem } = useSelectedItemStore();
  const handleCloseModal = () => {
    closeModal();
    setProductId(0);
    clearItem('producto');
  };

  useEffect(() => {
    if (!isLoading && data && productId) {
      setItem('producto', data);
    }
  }, [isLoading, data, productId, setItem]);

  const rowExpansion = {
    content: ({ record }: { record: IProducto }) => <ExpansionProductoDetail record={record} />,
  };

  const renderersMap = {
    rowClassName: ({ stock, cantidad_minima }: IProducto): rowTypes | '' => {
      return cantidad_minima >= stock ? 'redRow' : '';
    },
    actions: ({ id }: IProducto) => (
      <div className="flex gap-2">
        <Button
          onClick={() => {
            openModal();
            setProductId(id!);
          }}
          variant="primary"
          size="sm"
        >
          <Edit />
        </Button>
        <Button
          onClick={() => {
            openModalNewImage();
            setProductId(id!);
          }}
          variant="primary"
          size="sm"
        >
          <Camera />
        </Button>
      </div>
    ),
  };
  const filters: IFilters<IFiltroProducto>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  const { refetch } = useServiceCatalogoProductosPdf();
  const handlePrint = async () => {
    setPdfLoading(true);
    const { data } = await refetch();
    if (data) {
      setPdfLoading(false);
      const fileURL = window.URL.createObjectURL(new Blob([data]));
      window.open(fileURL, '_blank');
    }
  };

  return {
    openModal,
    isOpen,
    filters,
    closeModal: handleCloseModal,
    useServiceIndexProductos,
    renderersMap,
    rowExpansion,
    isOpenNewImage,
    handlePrint,
    closeModalNewImage: () => {
      closeModalNewImage();
      setProductId(0);
    },
    productId,
    pdfLoading,
  };
};
