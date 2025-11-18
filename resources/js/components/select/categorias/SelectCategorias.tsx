import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectCategoriasProps {
  formik: FormikProps<any>;
}
export const SelectCategorias = (props: ISelectCategoriasProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexCategorias,
    filters: [],
    storeKey: `categoria-${formik.values.categoria_id || 0}`,
  });

  return <InputSelect<any> {...props} label={`Categoria`} name={`categoria_id`} formik={formik} options={options} onInputChange={handleInputChange} />;
};
