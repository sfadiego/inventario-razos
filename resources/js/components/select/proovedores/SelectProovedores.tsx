import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { FormikProps } from 'formik';

export const SelectProovedores = ({ formik }: { formik: FormikProps<any> }) => {
    const { isloading, data } = useServiceIndexProveedor({});
    console.log(isloading, data);
    const options: IOptions[] = [
        { value: 'marketing', label: 'Marketing' },
        { value: 'template', label: 'Template' },
        { value: 'development', label: 'Development' },
    ];
    return <InputSelect<IProducto> label={`Proveedor`} name={`proveedor_id`} formik={formik} options={options} />;
};
