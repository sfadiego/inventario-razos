import { DataTableRenderersMap } from '@/hooks/useDatatable';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { IFilterItem } from '../filters/modalFilter/types';

export interface IDatatableWithFilterProps {
    filters: IFilterItem[];
    refreshFlag?: boolean;
    renderersMap?: DataTableRenderersMap | undefined;
    service: (params: any) => any;
    propertyInputSearch?: string;
    disableNewButton?: boolean;
    onClickNew?: () => void;
    rowExpansion?: { content: ({ record }: { record: any }) => ReactNode };
    children: ((formik: FormikProps<any>) => ReactNode) | ReactNode;
    initialValues: any;
    newButtonText?: string;
}
