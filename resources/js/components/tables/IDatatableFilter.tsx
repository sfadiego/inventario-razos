import { DataTableRenderersMap } from '@/hooks/useDatatable';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { IFilterItem } from '../filters/modalFilter/types';

export interface IDatatableWithFilterProps {
    filters: IFilterItem[];
    propertyInputSearch?: string;
    onClickNew: () => void;
    service: (params: any) => any;
    renderersMap?: DataTableRenderersMap | undefined;
    rowExpansion?: { content: ({ record }: { record: any }) => ReactNode };
    children: ((formik: FormikProps<any>) => ReactNode) | ReactNode;
    initialValues: any;
}

export interface IDatatableFilterProps {
    filters: IFilterItem[];
    renderersMap?: DataTableRenderersMap | undefined;
    service: (params: any) => any;
    onClickNew: () => void;
    children: ((formik: FormikProps) => ReactNode) | ReactNode;
    initialValues: any;
}
