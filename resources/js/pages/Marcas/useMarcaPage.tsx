import { IFilters } from '@/components/filters/modalFilter/types';
import { useModal } from '@/hooks/useModal';
import { IMarca } from '@/models/marca.interface';

export const useMarcaPage = () => {
  const renderersMap = {
    actions: (item: IMarca) => <> -- </>,
  };

  const filters: IFilters<IMarca>[] = [
    {
      property: 'nombre',
      operator: 'like',
      initialValue: '',
    },
  ];
  const { openModal, closeModal, isOpen } = useModal();

  return { renderersMap, filters, openModal, closeModal, isOpen };
};
