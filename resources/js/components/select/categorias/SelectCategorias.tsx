import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { FormikProps } from 'formik';
import { MultiValue, SingleValue } from 'react-select';
import { useSelectService } from '../useSelectService';

interface ISelectCategoriasProps {
  formik: FormikProps<any>;
  onChange?: (option: SingleValue<IOptions> | MultiValue<IOptions>) => void;
}
export const SelectCategorias = (props: ISelectCategoriasProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexCategorias,
    filters: [],
    storeKey: `categoria-${formik.values.categoria_id || 0}`,
  });

  return (
    <InputSelect<any> {...props} label={`Categoria`} name={`categoria_id`} formik={formik} options={options} onInputChange={handleInputChange} />
  );
};
