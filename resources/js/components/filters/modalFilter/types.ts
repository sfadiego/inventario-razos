import { FormikProps } from 'formik';
import { ReactNode } from 'react';

export type operators = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'like';

export interface IFilters<Values> {
    property: Extract<keyof Values, string>;
    operator?: operators;
    initialValue: any;
}

export interface IFilterItem<Values> {
    property: Extract<keyof Values, string>;
    value: any;
    operator?: operators;
}
export interface IFilterData<Values> {
    filters: IFilterItem<Values>[];
}

export interface IModalFilterProps<Values> {
    isOpen: boolean;
    close: () => void;
    validationSchema?: any | (() => any);
    onSubmit: (filterData: IFilterData<Values>, values: Values) => void | Promise<any>;
    children: ((formik: FormikProps<any>) => ReactNode) | ReactNode;
    filters: IFilters<Values>[];
}
