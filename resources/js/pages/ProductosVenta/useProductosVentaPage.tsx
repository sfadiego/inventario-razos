import { Plus } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { BreadcrumbArrayProps } from '@/components/common/breadcrum';
import { IFilters } from '@/components/filters/modalFilter/types';
import { rowTypes } from '@/components/tables/rowTypes';
import Button from '@/components/ui/button/Button';

import { ExpansionProductoDetail } from '@/components/productos/ExpansionProductoDetail';
import { useModal } from '@/hooks/useModal';
import { IProducto } from '@/models/producto.interface';
import { AdminRoutes } from '@/router/modules/admin.routes';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { useParams } from 'react-router';

export interface IFiltroProductoVenta {
  nombre?: string;
  proveedor_id?: number;
  categoria_id?: number;
}
const FILTERS: IFilters<IFiltroProductoVenta>[] = [{ property: 'nombre', operator: 'like', initialValue: '' }];

const useProductoVentaModal = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const [productId, setProductId] = useState<number>(0);

  const show = useCallback(
    (id: number) => {
      setProductId(id);
      openModal();
    },
    [openModal],
  );

  const hide = useCallback(() => {
    setProductId(0);
    closeModal();
  }, [closeModal]);

  return { isOpen, productId, show, hide };
};

export interface useProductosVentaPageProps {
  ventaId?: number;
}

export const useProductosVentaPage = () => {
  const { id } = useParams();
  const ventaId = id ? Number(id) : 0;

  const { data: ventaData, isLoading } = useServiceShowVenta(ventaId);
  const productoVentaModal = useProductoVentaModal();

  const ventaFinalizada = useMemo(() => !isLoading && ventaData?.status_venta === 'finalizada', [isLoading, ventaData]);
  // Breadcrumbs
  const breadcrumb: BreadcrumbArrayProps[] = useMemo(
    () => [
      { name: 'Ventas', path: AdminRoutes.Venta },
      { name: 'Productos', path: `/venta/${ventaId}/productos` },
    ],
    [ventaId],
  );

  const rowExpansion = {
    content: ({ record: { compatibilidad, nombre, imagen } }: { record: IProducto }) => (
      <ExpansionProductoDetail nombre={nombre} compatibilidad={compatibilidad} imagen={imagen} />
    ),
  };
  // Renderers para la tabla de productos
  const renderersMap = useMemo(() => {
    return {
      rowClassName: ({ stock, cantidad_minima }: IProducto): rowTypes | '' => (cantidad_minima >= stock ? 'redRow' : ''),

      actions: ({ id, stock }: IProducto) =>
        stock > 0 &&
        !ventaFinalizada && (
          <Button onClick={() => productoVentaModal.show(id!)} variant="primary" size="sm">
            <Plus />
          </Button>
        ),
    };
  }, [ventaFinalizada, productoVentaModal]);

  return {
    isOpen: productoVentaModal.isOpen,
    openModal: productoVentaModal.show,
    closeModal: productoVentaModal.hide,
    productId: productoVentaModal.productId,
    filters: FILTERS,
    useServiceIndexProductos,
    renderersMap,
    rowExpansion,
    venta: isLoading ? null : (ventaData ?? null),
    breadcrumb,
  };
};
