import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';

import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';

import '@mantine/core/styles.layer.css';
import { Plus } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';
import { ModalProducto } from './partials/ModalProducto';

export default function ProductosPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const { dataTableProps } = useDataTable({
        service: useServiceIndexProductos,
        payload: {},
    });

    return (
        <>
            <PageWrapper pageTitle="Productos">
                <div className="grid grid-cols-12 gap-2 pb-5">
                    <div className="col-span-10"></div>
                    <div className="col-span-2 flex justify-end">
                        <Button onClick={openModal} className="">
                            <Plus /> Nuevo producto
                        </Button>
                    </div>
                    <div className="col-span-12">
                        <DataTable {...dataTableProps} />
                    </div>
                </div>

                <ModalProducto closeModal={closeModal} isOpen={isOpen}></ModalProducto>
            </PageWrapper>
        </>
    );
}
