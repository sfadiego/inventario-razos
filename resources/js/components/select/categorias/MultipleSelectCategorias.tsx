import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { ICategoria } from '@/models/categoria.interface';
import { FormikProps } from 'formik';
import { useSelectCategorias } from './useSelectCategorias';

export const MultipleSelectCategorias = <T extends any>({ formik, name }: { name: string; formik: FormikProps<any> }) => {
  const { options } = useSelectCategorias();

  const items = formik.values[name] ? formik.values[name].map((item: ICategoria) => item.id) : [];
  const selected = options.filter((option): option is IOptions => items.includes(option.value));

  return <InputSelect<any> setValue={selected} label={`Categoria`} name={name} formik={formik} isMulti={true} options={options} />;
};
