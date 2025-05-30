import { PageWrapper } from '@/components/layout/PageWrapper';
import Button from '@/components/ui/button/Button';
import { useDataTable } from '@/hooks/useDatatable';
import { useModal } from '@/hooks/useModal';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';
import { DataTable } from 'mantine-datatable';
import { ModalUbicacion } from './partials/ModalUbicacion';

export default function ProovedoresPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const { dataTableProps } = useDataTable({
        service: useServiceIndexUbicaciones,
        payload: {},
    });

    return (
        <PageWrapper pageTitle="Ubicaciones">
            <div className="grid grid-cols-12 gap-2 pb-5">
                <div className="col-span-10"></div>
                <div className="col-span-2 flex justify-end">
                    <Button onClick={openModal} className="">
                        Nueva ubicacion
                    </Button>
                </div>
                <div className="col-span-12">
                    <DataTable {...dataTableProps} />
                </div>
            </div>
            <ModalUbicacion closeModal={closeModal} isOpen={isOpen}></ModalUbicacion>
        </PageWrapper>
    );
}
