import { IFilters } from '@/components/filters/modalFilter/types';
import { ExpansionProductoDetail } from '@/components/productos/ExpansionProductoDetail';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProductos, useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { Camera, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProductoStore } from './partials/useProductoStore';

export interface IFiltroProducto {
  nombre?: string;
  proveedor_id?: number;
  categoria_id?: number;
}

export const useProductosPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const { openModal: openModalNewImage, isOpen: isOpenNewImage, closeModal: closeModalNewImage } = useModal();
  const [productId, setProductId] = useState<number>(0);
  const { isLoading, data } = useServiceShowProducto(productId);
  const { setSelectedProducto } = useProductoStore();
  const handleCloseModal = () => {
    closeModal();
    setProductId(0);
    setSelectedProducto(null);
  };

  useEffect(() => {
    if (!isLoading && data && productId) {
      setSelectedProducto(data);
    }
  }, [isLoading, data, setSelectedProducto, productId]);

  const rowExpansion = {
    content: ({ record: { compatibilidad, nombre, imagen } }: { record: IProducto }) => (
      <ExpansionProductoDetail nombre={nombre} compatibilidad={compatibilidad} imagen={imagen} />
    ),
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

  return {
    openModal,
    isOpen,
    filters,
    closeModal: handleCloseModal,
    useServiceIndexProductos,
    renderersMap,
    rowExpansion,
    isOpenNewImage,
    closeModalNewImage: () => {
      closeModalNewImage();
      setProductId(0);
    },
    productId,
  };
};
