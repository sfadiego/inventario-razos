import { DataTableRenderersMap } from '@/hooks/useDatatable';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { IFilters } from '../filters/modalFilter/types';
import { ColumnProperties } from './columnProperties';

//TODO: validar refreshFlag
export interface IDatatableWithFilterProps<Values> {
  filters: IFilters<Values>[];
  onClickNew: () => void;
  service: (params: any) => any;
  renderersMap?: DataTableRenderersMap | undefined;
  columnProperties?: ColumnProperties<any>;
  rowExpansion?: {
    content: ({ record }: { record: any }) => ReactNode;
  };
  children: ((formik: FormikProps<Values>) => ReactNode) | ReactNode;
  //custom
  newButtonText?: string;
  inputPlaceholder?: string;
  disableNewButton?: boolean;
  payload?: any;
}
