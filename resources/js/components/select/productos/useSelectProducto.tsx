import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { FormikProps } from 'formik';

export interface ISelectProductoProps {
    disabled?: boolean;
    formik: FormikProps<any>;
}

const useCompareOrAddNewOption = (data: IOptions[]) => data;

export const useSelectProducto = () => {
    const { isLoading, data } = useServiceIndexProductos({});
    const defaultValues = [{ value: 0, label: `seleccionar...` }];
    const options = useCompareOrAddNewOption(
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
            defaultValues,
    );
    return { options };
};
