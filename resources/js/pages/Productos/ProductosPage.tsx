import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import Button from '@/components/ui/button/Button';
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
            <PageWrapper pageTitle="Productos">
                <div className="grid grid-cols-12 gap-2 pb-5">
                    <div className="col-span-10"></div>
                    <div className="col-span-2">
                        <Button size="sm" variant="primary">
                            Button Text
                        </Button>
                    </div>
                    <div className="col-span-12">
                        <DataTable {...dataTableProps} />
                    </div>
                </div>
            </PageWrapper>
        </>
    );
}
