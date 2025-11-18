import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { FormikProps } from 'formik';
import { MultiValue, SingleValue } from 'react-select';
import { useSelectService } from '../useSelectService';

interface ISelectClienteProps {
  disabled?: boolean;
  formik: FormikProps<any>;
  onChange?: (option: SingleValue<IOptions> | MultiValue<IOptions>) => void;
}
export const SelectCliente = (props: ISelectClienteProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexClientes,
    storeKey: `cliente-${formik.values.cliente_id || 0}`,
  });

  return <InputSelect {...props} label={`Cliente`} name={`cliente_id`} options={options} onInputChange={handleInputChange} />;
};
