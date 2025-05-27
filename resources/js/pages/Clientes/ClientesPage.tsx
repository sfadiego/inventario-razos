import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { DataTable } from 'mantine-datatable';

export default function ClientesPage() {
    const { dataTableProps } = useDataTable({
        service: useServiceIndexClientes,
        payload: {},
    });

    return (
        <PageWrapper pageTitle="Clientes">
            <div className="grid grid-cols-12 gap-2 pb-5">
                <div className="col-span-12">
                    <DataTable {...dataTableProps} />
                </div>
            </div>
        </PageWrapper>
    );
}
