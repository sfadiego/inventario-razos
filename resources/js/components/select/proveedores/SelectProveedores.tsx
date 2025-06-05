import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useProductoStore } from '@/pages/Productos/partials/useProductoStore';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { FormikProps } from 'formik';

const useCompareOrAddNewOption = (data: IOptions[]) => {
    const { producto } = useProductoStore();
    const existInOriginalData = !!(producto && data?.find((item: IOptions) => item.value === producto?.proveedor_id));
    const newOption: IOptions = {
        value: producto?.proveedor?.id ?? 0,
        label: producto?.proveedor?.nombre ?? '',
    };
    return producto && data.length && !existInOriginalData ? [...data, newOption] : data;
};

export const SelectProveedores = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexProveedor({});
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
            setValue={options.filter((option): option is IOptions => option.value === formik.values.proveedor_id)}
            label={`Proveedor`}
            name={`proveedor_id`}
            formik={formik}
            options={options}
        />
    );
};
