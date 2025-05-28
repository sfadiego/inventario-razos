import { IFilterItem } from '@/components/form/select/interfaces/IFilter';
import { useDataTable } from '@/components/tables/useDatatable';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { useState } from 'react';

export const useProductPage = ({ combinedFilters }: { combinedFilters: IFilterItem[any] }) => {
    const [search, setSearch] = useState<string>('');
    const { openModal, isOpen, closeModal } = useModal();

    const { dataTableProps, refetch } = useDataTable({
        service: useServiceIndexProductos,
        payload: {
            filters: combinedFilters,
        },
    });
    return { openModal, dataTableProps, isOpen, closeModal, search, setSearch, refetch };
};
