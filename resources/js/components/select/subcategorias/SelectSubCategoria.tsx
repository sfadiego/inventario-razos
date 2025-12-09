import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexSubCategorias } from '@/Services/subcategorias/useServiceSubCategorias';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectSubCategoriaProps {
  formik: FormikProps<any>;
}
export const SelectSubCategoria = (props: ISelectSubCategoriaProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexSubCategorias,
    filters: [],
    payload: { categoriaId: formik.values.categoria_id },
    storeKey: `subcategoria-${formik.values.subcategoria_id || 0}`,
  });

  return (
    <InputSelect<any>
      {...props}
      label={`Subcategoria`}
      name={`subcategoria_id`}
      formik={formik}
      options={options}
      onInputChange={handleInputChange}
    />
  );
};
