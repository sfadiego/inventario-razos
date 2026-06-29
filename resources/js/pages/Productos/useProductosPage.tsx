import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { IFilters } from '@/components/filters/modalFilter/types';
import { ExpansionProductoDetail } from '@/components/productos/ExpansionProductoDetail';
import { ColumnProperties } from '@/components/tables/columnProperties';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IProducto } from '@/models/producto.interface';
import { ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceDeleteProducto, useServiceIndexProductos, useServiceShowProducto } from '@/Services/productos/useServiceProductos';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { Camera, Edit, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export interface IFiltroProducto {
  categoria_id?: number | null;
  proveedor_id?: number | null;
  marca_id?: number | null;
}

export const useProductosPage = () => {
  const { openModal, isOpen, closeModal } = useModal();
  const { openModal: openModalNewImage, isOpen: isOpenNewImage, closeModal: closeModalNewImage } = useModal();
  const [productId, setProductId] = useState<number>(0);
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

  const columnProperties: ColumnProperties<any> = {
    nombre: {
      width: 300,
      ellipsis: true,
    },
  };

  const queryClient = useQueryClient();
  const mutatorDelete = useServiceDeleteProducto(productId);
  const { onSubmit: onSubmitDelete } = useOnSubmit({
    mutateAsync: mutatorDelete.mutateAsync,
    onSuccess: async () => {
      setProductId(0);
      clearItem('producto');
      queryClient.invalidateQueries({
        queryKey: [`${ApiRoutes.Productos}`],
      });
    },
  });
  const handleDelete = useCallback(() => {
    onSubmitDelete(null, {});
  }, [onSubmitDelete]);

  const confirmDelete = (prod: IProducto) => {
    AlertSwal({
      type: AlertTypeEnum.Confirm,
      onConfirm: (result) => {
        if (result.isConfirmed) {
          setProductId(prod.id!);
          handleDelete();
        }
      },
    });
  };

  const renderersMap = {
    rowClassName: ({ stock, cantidad_minima }: IProducto): rowTypes | '' => {
      return cantidad_minima >= stock ? 'redRow' : '';
    },
    actions: (prod: IProducto) => (
      <div className="flex gap-2">
        <Button
          onClick={() => {
            openModal();
            setProductId(prod.id!);
          }}
          variant="primary"
          size="sm"
        >
          <Edit />
        </Button>
        <Button
          onClick={() => {
            openModalNewImage();
            setProductId(prod.id!);
          }}
          variant="primary"
          size="sm"
        >
          <Camera />
        </Button>
        <Button onClick={() => confirmDelete(prod!)} variant="error" size="sm">
          <Trash2 />
        </Button>
      </div>
    ),
  };
  const filters: IFilters<IFiltroProducto>[] = [
    { property: 'categoria_id', operator: '=', initialValue: null },
    { property: 'proveedor_id', operator: '=', initialValue: null },
    { property: 'marca_id', operator: '=', initialValue: null },
  ];

  return {
    openModal,
    isOpen,
    filters,
    closeModal: handleCloseModal,
    useServiceIndexProductos,
    renderersMap,
    rowExpansion,
    columnProperties,
    isOpenNewImage,
    closeModalNewImage: () => {
      closeModalNewImage();
      setProductId(0);
    },
    productId,
  };
};
