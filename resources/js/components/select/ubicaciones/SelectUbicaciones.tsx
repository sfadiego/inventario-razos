import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useStoreProducto } from '@/pages/Productos/partials/useProductoStore';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';
import { FormikProps } from 'formik';

const useCompareOrAddNewOption = (data: IOptions[]) => {
    const { producto } = useStoreProducto();
    const existInOriginalData = !!(producto && data?.find((item: IOptions) => item.value === producto?.ubicacion_id));
    const newOption: IOptions = {
        value: producto?.ubicacion?.id ?? 0,
        label: producto?.ubicacion?.nombre ?? '',
    };
    return producto && data.length && !existInOriginalData ? [...data, newOption] : data;
};

export const SelectUbicaciones = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexUbicaciones({});
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
            setValue={options.filter((option): option is IOptions => option.value === formik.values.ubicacion_id)}
            label={`Ubicacion`}
            name={`ubicacion_id`}
            formik={formik}
            options={options}
        />
    );
};
