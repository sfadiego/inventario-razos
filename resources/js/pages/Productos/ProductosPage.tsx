import { PageWrapper } from '@/components/layout/PageWrapper';

import '@mantine/core/styles.layer.css';
import { DataTable } from 'mantine-datatable';
import 'mantine-datatable/styles.layer.css';

export default function ProductosPage() {
    const data = [
        {
            id: '1323addd-a4ac-4dd2-8de2-6f934969a0f1',
            name: 'Feest, Bogan and Herzog',
            streetAddress: '21716 Ratke Drive',
            city: 'Stromanport',
            state: 'WY',
            missionStatement: 'Innovate bricks-and-clicks metrics.',
        },
        {
            id: '0cf96f1c-62c9-4e3f-97b0-4a2e8fa2bf6b',
            name: 'Cummerata - Kuhlman',
            streetAddress: '6389 Dicki Stream',
            city: 'South Gate',
            state: 'NH',
            missionStatement: 'Harness real-time channels.',
        },
    ];

    return (
        <>
            <PageWrapper blankWrapper={true} pageTitle="Productos">
                <DataTable
                    withTableBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    highlightOnHover
                    columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
                    records={data}
                />
            </PageWrapper>
        </>
    );
}
