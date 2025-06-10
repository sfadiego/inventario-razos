import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useClienteStore } from '@/pages/Clientes/partials/useClienteStore';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { FormikProps } from 'formik';

const useCompareOrAddNewOption = (data: IOptions[]) => {
    const { cliente } = useClienteStore();
    const existInOriginalData = !!(cliente && data?.find((item: IOptions) => item.value === cliente?.id));
    const newOption: IOptions = {
        value: cliente?.id ?? 0,
        label: cliente?.nombre ?? '',
    };
    return cliente && data.length && !existInOriginalData ? [...data, newOption] : data;
};

export const SelectCliente = ({ formik, disabled = false }: { disabled?: boolean; formik: FormikProps<any> }) => {
    const { isLoading, data } = useServiceIndexClientes({});

    const defaultValues = [{ value: 0, label: `seleccionar...` }];
    const options = useCompareOrAddNewOption(
        (!isLoading &&
            data?.data.map((item) => ({
                value: item.id ?? 0,
                label: item.nombre,
            }))) ||
            defaultValues,
    );
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
