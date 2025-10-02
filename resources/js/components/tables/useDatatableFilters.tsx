import { useDataTable } from '@/hooks/useDatatable';
import { useModal } from '@/hooks/useModal';
import { useMemo, useState } from 'react';
import { IFilterData, IFilterItem } from '../filters/modalFilter/types';
import { IDatatableWithFilterProps } from './IDatatableFilter';

export const useDatatableFilters = <Values,>(props: IDatatableWithFilterProps<Values>) => {
  const { onClickNew, renderersMap, rowExpansion, service, children, filters } = props;
  const [search, setSearch] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<IFilterItem<Values>[]>([]);
  const { openModal, isOpen, closeModal } = useModal(false);
  const combinedFilters = useMemo(() => {
    return [...appliedFilters];
  }, [appliedFilters]);

  const { dataTableProps, isLoading, refetch } = useDataTable({
    service,
    payload: {
      filters: combinedFilters,
      search: search,
    },
    renderersMap,
  });

  const onFilter = (filters: IFilterData<Values>) => {
    setAppliedFilters(filters.filters);
    refetch();
  };
  return {
    openModal,
    isOpen,
    filters,
    search,
    closeModal,
    dataTableProps,
    rowExpansion,
    isLoading,
    children,
    onFilter,
    setSearch,
    onClickNew,
  };
};
