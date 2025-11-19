import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { FormikProps } from 'formik';
interface ISelectProductoUnidades {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectProductoUnidades = (props: ISelectProductoUnidades) => {
  const options: IOptions[] = [
    { value: 'pieza', label: `pieza` },
    { value: 'metro', label: `metro` },
    { value: 'par', label: `par` },
  ];
  return <InputSelect {...props} label={`Unidad`} name={'unidad'} options={options} />;
};
