import { useDataTable } from '@/hooks/useDatatable';
import { useModal } from '@/hooks/useModal';
import { useMemo, useState } from 'react';
import { IFilterItem } from '../filters/modalFilter/types';
import { IDatatableFilterProps } from './IDatatableFilter';

export const fomikValuesToSearchFilter = (filterValues: Record<string, string>) => {
    return Object.keys(filterValues).map((key) => {
        const item: IFilterItem = {
            property: key,
            operator: 'like',
            value: filterValues[key] || '',
        };
        return item;
    });
};
export const useDatatableFilters = (props: IDatatableFilterProps) => {
    const { service, renderersMap, onClickNew, children, initialValues } = props;
    const [search, setSearch] = useState<string>('');
    const { openModal, isOpen, closeModal } = useModal();
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
        return [...searchFilter, ...appliedFilters] as IFilterItem[];
    }, [searchFilter, appliedFilters]);

    const onFilter = (filterValues: Record<string, string>) => {
        const filterItems = fomikValuesToSearchFilter(filterValues);
        setAppliedFilters(filterItems);
    };
    const { dataTableProps, isLoading, refetch } = useDataTable({
        service,
        payload: {
            filters: combinedFilters,
        },
        renderersMap,
    });

    return {
        dataTableProps,
        isLoading,
        refetch,
        search,
        setSearch,
        onFilter,
        openModal,
        isOpen,
        closeModal,
        onClickNew,
        children,
        initialValues,
    };
};
