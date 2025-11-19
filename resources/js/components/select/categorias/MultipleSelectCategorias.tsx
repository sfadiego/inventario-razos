import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

export const MultipleSelectCategorias = (props: { name: string; formik: FormikProps<any> }) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexCategorias,
    filters: [],
    storeKey: `categoria-${formik.values.categoria_id || 0}`,
  });

  return <InputSelect<any> {...props} label={`Categoria`} isMulti={true} options={options} onInputChange={handleInputChange} />;
};
