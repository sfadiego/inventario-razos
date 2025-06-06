import InputSelect from '@/components/form/select/InputSelect';
import { IVenta } from '@/models/venta.interface';
import { FormikProps } from 'formik';

export const SelectTipoVenta = ({ formik, disabled = false }: { disabled?: boolean; formik: FormikProps<IVenta> }) => {
    const options = [
        { value: 'credito', label: `credito` },
        { value: 'contado', label: `contado` },
    ];
    return (
        <InputSelect<IVenta>
            setValue={options.filter((option) => option.value === formik.values.tipo_compra)}
            label={`Tipo de venta`}
            name={`tipo_compra`}
            formik={formik}
            disabled={disabled}
            options={options}
        />
    );
};
