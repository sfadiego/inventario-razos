import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';

import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { InputWithIcon } from '@/components/form/input/InputWithIcon';
import { IFilterItem } from '@/components/form/select/interfaces/IFilter';
import '@mantine/core/styles.layer.css';
import { Filter, Plus } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { useMemo, useState } from 'react';
import { FiltrosProductos } from './partials/FiltrosProductos';
import { ModalProducto } from './partials/ModalProducto';

export default function ProductosPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: isOpenFilter, openModal: openModalFilter, closeModal: closeModalFilter } = useModal();
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

    const { dataTableProps } = useDataTable({
        service: useServiceIndexProductos,
        payload: {
            filters: combinedFilters,
        },
    });
    return (
        <>
            <PageWrapper pageTitle="Productos">
                <div className="grid grid-cols-12 gap-2 pb-5">
                    <div className="col-span-12 md:col-span-10">
                        <InputWithIcon
                            name={`search`}
                            value={search}
                            placeholder={`Buscar ...`}
                            inputCallback={(e) => setSearch(e.target.value)}
                            IconComponent={() => <Filter className="text-gray-500" onClick={openModalFilter} />}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                        <Button onClick={openModal} className="w-full">
                            <Plus /> Nuevo producto
                        </Button>
                    </div>
                    <div className="col-span-12">
                        <DataTable {...dataTableProps} />
                    </div>
                </div>
                <ModalProducto closeModal={closeModal} isOpen={isOpen}></ModalProducto>
                {isOpenFilter && <FiltrosProductos isOpen={isOpenFilter} onFilter={onFilter} closeModal={closeModalFilter} />}
            </PageWrapper>
        </>
    );
}
