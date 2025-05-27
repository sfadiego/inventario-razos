import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';
import { FormikProps } from 'formik';

export const SelectUbicaciones = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexUbicaciones({});
    const options: IOptions[] =
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
        [];
    return <InputSelect<IProducto> label={`Ubicaciones`} name={`ubicacion_id`} formik={formik} options={options} />;
};
