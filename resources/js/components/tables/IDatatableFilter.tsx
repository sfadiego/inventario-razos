import { DataTableRenderersMap } from '@/hooks/useDatatable';
import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { IFilters } from '../filters/modalFilter/types';

//TODO: validar refreshFlag
export interface IDatatableWithFilterProps<Values> {
    filters: IFilters<Values>[];
    propertyInputSearch?: string;
    onClickNew: () => void;
    service: (params: any) => any;
    renderersMap?: DataTableRenderersMap | undefined;
    rowExpansion?: {
        content: ({ record }: { record: any }) => ReactNode;
    };
    children: ((formik: FormikProps<Values>) => ReactNode) | ReactNode;
    //custom
    newButtonText?: string;
    disableNewButton?: boolean;
}
