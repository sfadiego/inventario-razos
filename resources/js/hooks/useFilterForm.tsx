import { IFilterItem } from '@/components/form/select/interfaces/IFilter';
import { useMemo, useState } from 'react';
import { useModal } from './useModal';

export const useFilterForm = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const [search, setSearch] = useState<string>('');
    const [appliedFilters, setAppliedFilters] = useState<IFilterItem[]>([]);
    const searchFilter = useMemo(() => {
        return search
            ? [
                  {
                      property: 'nombre',
                      operator: 'like',
                      value: search,
                  },
              ]
            : [];
    }, [search]);

    const combinedFilters = useMemo(() => {
        return [...searchFilter, ...appliedFilters];
    }, [searchFilter, appliedFilters]);

    const onFilter = (filters: IFilterItem[]) => {
        setAppliedFilters(filters);
    };

    return {
        setSearch,
        onFilter,
        combinedFilters,
        isOpenFilter: isOpen,
        openModalFilter: openModal,
        closeModalFilter: closeModal,
    };
};
