import { BreadcrumbArrayProps } from '@/components/common/breadcrum';
import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { ISubcategoria } from '@/models/subcategoria.interface';
import { AdminRoutes, ApiRoutes } from '@/router/modules/admin.routes';
import { useServiceDeleteSubCategoria, useServiceShowSubCategoria } from '@/Services/subcategorias/useServiceSubCategorias';
import { useSelectedItemStore } from '@/store/useSelectedItemStore';
import { useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useSubcategoriaPage = () => {
  const { id } = useParams();
  const categoriaId = id ? Number(id) : 0;
  const { openModal, closeModal, isOpen } = useModal();
  const [selected, setSelected] = useState(0);
  const { setItem, clearItem } = useSelectedItemStore();
  const { isLoading, data } = useServiceShowSubCategoria(categoriaId, selected);
  const mutatorDelete = useServiceDeleteSubCategoria(selected);
  useEffect(() => {
    if (!isLoading && data && selected) {
      setItem('subcategoria', data);
    }
  }, [isLoading, data, selected, setItem]);

  const handleCloseModal = () => {
    closeModal();
    setSelected(0);
    clearItem('subcategoria');
  };

  const { onSubmit: onSubmitDelete } = useOnSubmit({
    mutateAsync: mutatorDelete.mutateAsync,
    onSuccess: async () => {
      setSelected(0);
    },
  });

  const queryClient = useQueryClient();
  const handleDelete = useCallback(() => {
    onSubmitDelete(null, {});
    queryClient.invalidateQueries({ queryKey: [`${ApiRoutes.Categorias}/${categoriaId}/subcategorias`] });
  }, [onSubmitDelete, categoriaId, queryClient]);

  const renderersMap = {
    actions: (item: ISubcategoria) => (
      <>
        <Button
          onClick={() => {
            openModal();
            setSelected(item.id!);
          }}
          variant="primary"
          size="sm"
        >
          <Edit />
        </Button>
        <Button
          className="ml-2"
          onClick={() => {
            setSelected(item.id!);
            handleDelete();
          }}
          variant="error"
          size="sm"
        >
          <Trash2 />
        </Button>
      </>
    ),
  };

  const filters: IFilters<ISubcategoria>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];

  const breadcrumbArray: BreadcrumbArrayProps[] = [
    { name: 'Categorías', path: AdminRoutes.Categorias, isActive: true },
    { name: 'Subcategorías', path: '', isActive: false },
  ];

  return {
    renderersMap,
    filters,
    openModal,
    isOpen,
    categoriaId,
    closeModal: handleCloseModal,
    breadcrumbArray
  };
};
