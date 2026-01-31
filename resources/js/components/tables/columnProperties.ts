import { DataTableColumn } from 'mantine-datatable';

export type ColumnProperties<T> = Record<string, Partial<DataTableColumn<T>>>;
