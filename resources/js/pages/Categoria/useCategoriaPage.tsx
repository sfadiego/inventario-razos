import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { ICategoria } from '@/models/categoria.interface';
import { Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const useCategoriaPage = () => {
  const navigate = useNavigate();
  const renderersMap = {
    actions: (item: ICategoria) => (
      <Button className="text-blue-500" onClick={() => navigate(`/admin/categorias/${item.id}/subcategorias`)}>
        <Hammer />
      </Button>
    ),
  };

  const filters: IFilters<ICategoria>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];
  const { openModal, closeModal, isOpen } = useModal();

  return { renderersMap, filters, openModal, closeModal, isOpen };
};
