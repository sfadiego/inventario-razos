import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { FormikProps } from 'formik';

export const SelectCategorias = ({ formik }: { formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexCategorias({});
    const options: IOptions[] =
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id,
                label: item.nombre,
            }))) ||
        [];
    return <InputSelect<IProducto> label={`Categoria`} name={`categoria_id`} formik={formik} options={options} />;
};
