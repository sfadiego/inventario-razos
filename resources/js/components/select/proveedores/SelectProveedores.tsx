import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { FormikProps } from 'formik';

export const SelectProveedores = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexProveedor({});
    const options: IOptions[] =
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
        [];

    return <InputSelect<IProducto> label={`Proveedor`} name={`proveedor_id`} formik={formik} options={options} />;
};
