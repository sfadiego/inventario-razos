import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useProductoStore } from '@/pages/Productos/partials/useProductoStore';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { FormikProps } from 'formik';

const useCompareOrAddNewOption = (data: IOptions[]) => {
    const { producto } = useProductoStore();
    const existInOriginalData = !!(producto && data?.find((item: IOptions) => item.value === producto?.categoria_id));
    const newOption: IOptions = {
        value: producto?.categoria?.id ?? 0,
        label: producto?.categoria?.nombre ?? '',
    };
    return producto && data.length && !existInOriginalData ? [...data, newOption] : data;
};
export const SelectCategorias = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexCategorias({});
    const defaultValues = [{ value: 0, label: `seleccionar...` }];
    const options = useCompareOrAddNewOption(
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
            defaultValues,
    );
    return (
        <InputSelect<IProducto>
            setValue={options.filter((option): option is IOptions => option.value === formik.values.categoria_id)}
            label={`Categoria`}
            name={`categoria_id`}
            formik={formik}
            options={options}
        />
    );
};
