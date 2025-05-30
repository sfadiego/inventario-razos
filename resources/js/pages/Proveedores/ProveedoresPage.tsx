import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/hooks/useDatatable';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { DataTable } from 'mantine-datatable';
import { ModalProveedor } from './partials/ModalProveedor';
import { Plus } from 'lucide-react';

export default function ProveedoresPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const { dataTableProps } = useDataTable({
        service: useServiceIndexProveedor,
        payload: {},
    });

    return (
        <PageWrapper pageTitle="Proveedores">
            <div className="grid grid-cols-12 gap-2 pb-5">
                <div className="col-span-10"></div>
                <div className="col-span-2 flex justify-end">
                    <Button onClick={openModal} startIcon={<Plus />} className="">
                        Nuevo Proveedor
                    </Button>
                </div>
                <div className="col-span-12">
                    <DataTable {...dataTableProps} />
                </div>
            </div>
            <ModalProveedor closeModal={closeModal} isOpen={isOpen}></ModalProveedor>
        </PageWrapper>
    );
}
