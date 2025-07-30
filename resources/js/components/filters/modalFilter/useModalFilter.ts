import { FormikProps } from 'formik';
import { IFilterItem, IModalFilterProps } from './types';

export const useModalFilter = <Values extends Record<string, any>>(props: IModalFilterProps<Values>) => {
    const { filters = [], validationSchema, isOpen, children, close, onSubmit } = props;
    const initialValues: Values = filters.reduce<Partial<Values>>(
        (previousValue, filter) => ({
            ...previousValue,
            [filter.property]: filter.initialValue,
        }),
        {},
    ) as Values;

    const handleOnSubmit = (values: Values): void => {
        const arrayToPipeString = (arr: any[]): string => {
            return arr.join('|');
        };

        const filtersArray: IFilterItem<Values>[] = [];

        Object.entries(values as Record<string, unknown>).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '' || (Array.isArray(value) && !value.length)) {
                return;
            }

            let filter: IFilterItem<Values> | undefined;

            const currentFilter = filters.find((filter) => filter.property === key);
            const operator = currentFilter?.operator;

            if (Array.isArray(value) && value.length > 0) {
                filter = {
                    property: key as Extract<keyof Values, string>,
                    value: arrayToPipeString(value),
                };
            } else if (typeof value === 'object' && value !== null && 'from' in value) {
                if (value.from && (typeof value.from === 'string' || typeof value.from === 'number' || value.from instanceof Date)) {
                    filter = {
                        property: `${key}_from` as Extract<keyof Values, string>,
                        value: new Date(value.from).toISOString().split('T')[0],
                    };
                }

                if ('to' in value && value.to && (typeof value.to === 'string' || typeof value.to === 'number' || value.to instanceof Date)) {
                    filter = {
                        property: `${key}_to` as Extract<keyof Values, string>,
                        value: new Date(value.to).toISOString().split('T')[0],
                    };
                    filtersArray.push(filter);
                }
            } else if (value !== '') {
                filter = {
                    property: key as Extract<keyof Values, string>,
                    value: value,
                };
            }

            if (filter && operator) {
                filter.operator = operator;
            }

            if (filter) {
                filtersArray.push(filter);
            }
        });

        if (onSubmit) {
            onSubmit({ filters: filtersArray }, values);
        }

        close();
    };

    const onClear = (formik: FormikProps<typeof initialValues>) => {
        formik.resetForm({ values: initialValues });
    };

    return {
        initialValues,
        validationSchema,
        isOpen,
        children,
        close,
        onClear,
        onSubmit: handleOnSubmit,
    };
};
