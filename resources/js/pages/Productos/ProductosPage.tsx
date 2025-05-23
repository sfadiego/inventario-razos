import { PageWrapper } from '@/components/layout/PageWrapper';
import { useDataTable } from '@/components/tables/useDatatable';
import { useServiceIndexProductos } from '@/services/productos/useServiceProductos';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

export default function ProductosPage() {
    // const PAGE_SIZE = 15;
    // const data2 = [
    //     {
    //         id: '1323addd-a4ac-4dd2-8de2-6f934969a0f1',
    //         name: 'Feest, Bogan and Herzog',
    //         streetAddress: '21716 Ratke Drive',
    //         city: 'Stromanport',
    //         state: 'WY',
    //         missionStatement: 'Innovate bricks-and-clicks metrics.',
    //     },
    //     {
    //         id: '0cf96f1c-62c9-4e3f-97b0-4a2e8fa2bf6b',
    //         name: 'Cummerata - Kuhlman',
    //         streetAddress: '6389 Dicki Stream',
    //         city: 'South Gate',
    //         state: 'NH',
    //         missionStatement: 'Harness real-time channels.',
    //     },
    // ];

    // const columns = [{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }];
    // const [page, setPage] = useState(1);
    // const [records, setRecords] = useState(data2.slice(0, PAGE_SIZE));

    // useEffect(() => {
    //     const from = (page - 1) * PAGE_SIZE;
    //     const to = from + PAGE_SIZE;
    //     setRecords(data2.slice(from, to));
    // }, [page]);

    // const { isLoading, data } = useServiceIndexProductos({});
    // console.log(isLoading, data);
    const { data, isLoading } = useDataTable({ service: useServiceIndexProductos, payload: {} });
    console.log(data, isLoading);
    return (
        <>
            <PageWrapper blankWrapper={true} pageTitle="Productos">
                {/* <DataTable
                    withTableBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    highlightOnHover
                    columns={columns}
                    records={records}
                    totalRecords={data2.length}
                    recordsPerPage={PAGE_SIZE}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                /> */}
                <></>
            </PageWrapper>
        </>
    );
}
