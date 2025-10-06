import { DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';

export interface DataTableRenderersMap {
  [key: string]: (record: any) => React.ReactNode;
}

interface UseDataTableParams {
  service: (params: any) => any;
  payload?: any;
  dataTableProps?: (props: any) => any;
  renderersMap?: DataTableRenderersMap;
}
export const useDataTable = ({ service, payload = {}, renderersMap = {}, dataTableProps }: UseDataTableParams) => {
  const [page, setPage] = useState(1);
  const pageSize = [10, 20, 30, 50, 100];
  const [limit, setLimit] = useState(pageSize[0]);
  const { data, isLoading, refetch } = service({ page, limit, ...payload });
  const applyRenderers = (columns: DataTableColumn<any>[]) => {
    return columns.map((column) => {
      const accessor = column.accessor as string;
      if (accessor && renderersMap[accessor]) {
        return {
          ...column,
          render: renderersMap[accessor],
        };
      }

      return column;
    });
  };

  const rowExpansion = renderersMap?.rowExpansion || undefined;
  const defaultDataTableProps = {
    page,
    recordsPerPage: data?.per_page ?? limit,
    totalRecords: data?.total || 0,
    onPageChange: setPage,
    records: data?.data || [],
    columns: data?.columns ? applyRenderers(data.columns) : [],
    rowClassName: renderersMap.rowClassName ? renderersMap.rowClassName : '',
    rowExpansion: rowExpansion,
    onRecordsPerPageChange: setLimit,
    recordsPerPageOptions: pageSize,
    noRecordsText: 'No se encontraron resultados que coincidan con tu búsqueda',
    highlightOnHover: true,
    withTableBorder: true,
    withColumnBorders: true,
    striped: true,
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
