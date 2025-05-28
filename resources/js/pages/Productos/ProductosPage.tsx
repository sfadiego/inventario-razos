import { InputWithIcon } from '@/components/form/input/InputWithIcon';
import { PageWrapper } from '@/components/layout/PageWrapper';
import Button from '@/components/ui/button/Button';
import { useFilterForm } from '@/hooks/useFilterForm';
import '@mantine/core/styles.layer.css';
import { Filter, Plus } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { FiltrosProductos } from './partials/filters/FiltrosProductos';
import { ModalProducto } from './partials/ModalProducto';
import { useProductPage } from './useProductPage';

export default function ProductosPage() {
    const { onFilter, combinedFilters, isOpenFilter, openModalFilter, closeModalFilter } = useFilterForm();
    const { search, dataTableProps, setSearch, openModal, isOpen, closeModal, refetch } = useProductPage({ combinedFilters });
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
                    <div className="col-span-12 h-[500px] overflow-auto">
                        <DataTable  {...dataTableProps} />
                    </div>
                </div>
                <ModalProducto refetch={refetch} isOpen={isOpen} closeModal={closeModal}></ModalProducto>
                {isOpenFilter && <FiltrosProductos isOpen={isOpenFilter} onFilter={onFilter} closeModal={closeModalFilter} />}
            </PageWrapper>
        </>
    );
}
