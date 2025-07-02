import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';
interface ISelectTipoVenta {
    disabled?: boolean;
    formik: FormikProps<any>;
}
export const SelectTipoVenta = ({ formik, disabled = false }: ISelectTipoVenta) => {
    const options = [
        { value: 'credito', label: `credito` },
        { value: 'contado', label: `contado` },
    ];
    return (
        <InputSelect
            setValue={options.filter((option) => option.value === formik.values.tipo_compra)}
            label={`Tipo de venta`}
            name={'tipo_compra'}
            formik={formik}
            disabled={disabled}
            options={options}
        />
    );
};
