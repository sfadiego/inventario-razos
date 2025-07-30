import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';
import { useSelectTipoMovimiento } from './useSelectTipoMovimiento';

interface ISelectTipoMovimiento {
    disabled?: boolean;
    formik: FormikProps<any>;
    exclude?: string[];
}
export const SelectTipoMovimiento = ({ formik, exclude = [], disabled = false }: ISelectTipoMovimiento) => {
    const { options, selectedValue } = useSelectTipoMovimiento({ exclude, formik });
    return (
        <InputSelect
            setValue={selectedValue}
            label={`Tipo de movimiento`}
            name={'tipo_movimiento_id'}
            formik={formik}
            disabled={disabled}
            options={options}
        />
    );
};
