import { IFilters } from '@/components/filters/modalFilter/types';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { ICategoria } from '@/models/categoria.interface';
import { IProveedor } from '@/models/proveedor.interface';
import { useServiceIndexProveedor, useServiceShowProveedor } from '@/Services/proveedor/useServiceProveedor';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProveedorStore } from './partials/useProveedorStore';

export interface IFiltroProveedor {
  nombre: string;
  observaciones?: string;
  categorias?: ICategoria;
}
export const useProveedoresPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selected, setSelected] = useState(0);
  const { isLoading, data } = useServiceShowProveedor(selected);
  const { setSelectedProveedor } = useProveedorStore();
  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    setSelectedProveedor(null);
  };

  useEffect(() => {
    if (!isLoading && data && selected) {
      setSelectedProveedor(data);
    }
  }, [isLoading, data, selected, setSelectedProveedor]);

  const renderersMap = {
    categorias: ({ categorias }: IProveedor) => {
      return categorias && categorias.length > 0 ? (
        categorias.map((c: ICategoria) => (
          <Badge color="primary" variant="light" key={c.id}>
            {c.nombre}
          </Badge>
        ))
      ) : (
        <Badge variant="light" color="warning">
          Sin asignar
        </Badge>
      );
    },
    actions: ({ id }: IProveedor) => (
      <Button
        onClick={() => {
          openModal();
          setSelected(id!);
        }}
        variant="primary"
        size="sm"
      >
        <Edit />
      </Button>
    ),
  };
  const filters: IFilters<IFiltroProveedor>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  return {
    useServiceIndexProveedor,
    renderersMap,
    filters,
    isOpen,
    openModal,
    closeModal: handleCloseModal,
  };
};
