import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { FormikProps } from 'formik';

export const SelectCliente = ({ formik, disabled = false }: { disabled?: boolean; formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexClientes({});
    const defaultValues = [{ value: 0, label: `seleccionar...` }];
    const options =
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
        defaultValues;
    return (
        <InputSelect<any>
            setValue={options.filter((option) => option.value === formik.values.cliente_id)}
            label={`Cliente`}
            name={`cliente_id`}
            formik={formik}
            disabled={disabled}
            options={options}
        />
    );
};
