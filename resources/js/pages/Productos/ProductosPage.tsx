import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';

import '@mantine/core/styles.layer.css';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';

export default function ProductosPage() {
    const { dataTableProps } = useDataTable({
        service: useServiceIndexProductos,
        payload: {},
    });

    return (
        <>
            <PageWrapper  pageTitle="Productos">
                <DataTable {...dataTableProps} />
            </PageWrapper>
        </>
    );
}
