import { useDataTable } from '@/hooks/useDatatable';
import { useModal } from '@/hooks/useModal';
import { useEffect, useMemo, useState } from 'react';
import { IFilterItem } from '../filters/modalFilter/types';
import { IDatatableWithFilterProps } from './IDatatableFilter';

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
export const useDatatableFilters = (props: IDatatableWithFilterProps) => {
    const { service, refreshFlag, renderersMap, onClickNew, children, initialValues, propertyInputSearch } = props;
    const [search, setSearch] = useState<string>('');
    const { openModal, isOpen, closeModal } = useModal();
    const [appliedFilters, setAppliedFilters] = useState<IFilterItem[]>([]);
    const searchFilter = useMemo(() => {
        return search
            ? [
                  {
                      property: propertyInputSearch,
                      operator: 'like',
                      value: search,
                  },
              ]
            : [];
    }, [search, propertyInputSearch]);

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

    useEffect(() => {
        refetch();
    }, [refreshFlag, refetch]);

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
