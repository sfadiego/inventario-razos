import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { FormikProps } from 'formik';
interface ISelectProductoUnidades {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectProductoUnidades = ({ formik, disabled = false }: ISelectProductoUnidades) => {
  const options: IOptions[] = [
    { value: 'pieza', label: `pieza` },
    { value: 'metro', label: `metro` },
    { value: 'par', label: `par` },
  ];
  return (
    <InputSelect
      setValue={options.filter((option) => option.value === formik.values.unidad)}
      label={`Unidad`}
      name={'unidad'}
      formik={formik}
      disabled={disabled}
      options={options}
    />
  );
};
