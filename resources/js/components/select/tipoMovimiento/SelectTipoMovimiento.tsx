import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexTipoMovimiento } from '@/Services/tipoMovimiento/useServiceTipoMovimiento';
import { FormikProps } from 'formik';

interface ISelectTipoMovimiento {
    disabled?: boolean;
    formik: FormikProps<any>;
}
export const SelectTipoMovimiento = ({ formik, disabled = false }: ISelectTipoMovimiento) => {
    const { isLoading, data } = useServiceIndexTipoMovimiento({});
    const defaultValues = [{ value: 0, label: `seleccionar...` }];
    const options =
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
        defaultValues;
    return (
        <InputSelect
            setValue={options.filter((option) => option.value === formik.values.tipo_movimiento_id)}
            label={`Tipo de movimiento`}
            name={'tipo_movimiento_id'}
            formik={formik}
            disabled={disabled}
            options={options}
        />
    );
};
