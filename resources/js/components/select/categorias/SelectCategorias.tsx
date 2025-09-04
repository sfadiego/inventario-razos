import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { FormikProps } from 'formik';
import { useSelectCategorias } from './useSelectCategorias';

export const SelectCategorias = ({ formik }: { formik: FormikProps<any> }) => {
  const { options } = useSelectCategorias();
  return (
    <InputSelect<any>
      setValue={options.filter((option): option is IOptions => option.value === formik.values.categoria_id)}
      label={`Categoria`}
      name={`categoria_id`}
      formik={formik}
      options={options}
    />
  );
};
