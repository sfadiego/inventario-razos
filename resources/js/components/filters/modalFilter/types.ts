import { FormikProps } from 'formik';
import { ReactNode } from 'react';

export type operators = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'like';

export interface IFilterItem {
    property: string;
    value: string | number | boolean;
    operator: operators;
}

export interface IModalFilterProps {
    isOpen: boolean;
    close: () => void;
    validationSchema?: any | (() => any);
    onSubmit: (props: any) => void | Promise<any>;
    initialValues: Record<string, any>;
    children: ((formik: FormikProps<any>) => ReactNode) | ReactNode;
}
