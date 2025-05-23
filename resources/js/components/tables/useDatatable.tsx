import { useState } from 'react';

interface UseDataTableParams {
    service: (params: any) => any;
    payload?: any;
    dataTableProps?: (props: any) => any;
}

export const useDataTable = ({ service, payload = {}, dataTableProps }: UseDataTableParams) => {
    const [page, setPage] = useState(1);
    const pageSize = [10, 20, 30, 50, 100];
    const [limit, setLimit] = useState(pageSize[0]);
    const { data, isLoading, refetch } = service({ page, limit, ...payload });

    const defaultDataTableProps = {
        page,
        recordsPerPage: data?.per_page ?? limit,
        totalRecords: data?.total || 0,
        onPageChange: setPage,
        records: data?.data || [],
        columns: data?.columns ?? [],
        onRecordsPerPageChange: setLimit,
        recordsPerPageOptions: pageSize,
        noRecordsText: 'No se encontraron resultados que coincidan con tu búsqueda',
        highlightOnHover: true,
        className: 'whitespace-nowrap table-hover',
        minHeight: 200,
        paginationText: ({ from, to, totalRecords }: { from: number; to: number; totalRecords: number }) =>
            `Mostrando del ${from} al ${to} de ${totalRecords} registros`,
    };

    const finalDataTableProps = dataTableProps ? dataTableProps(defaultDataTableProps) : defaultDataTableProps;

    return {
        page,
        setPage,
        limit,
        setLimit,
        pageSize,
        data,
        isLoading,
        refetch,
        dataTableProps: finalDataTableProps,
    };
};
