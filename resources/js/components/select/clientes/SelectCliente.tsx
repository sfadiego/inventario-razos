import InputSelect from '@/components/form/select/InputSelect';
import { ISelectClienteProps, useSelectCliente } from './useSelectCliente';

export const SelectCliente = ({ formik, disabled = false }: ISelectClienteProps) => {
    const { options } = useSelectCliente();
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
