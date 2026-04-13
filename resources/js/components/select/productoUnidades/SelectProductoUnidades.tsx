import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { ProductoUnidadEnum } from '@/enums/ProductoUnidadEnum';
import { FormikProps } from 'formik';
interface ISelectProductoUnidades {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectProductoUnidades = (props: ISelectProductoUnidades) => {
  const options: IOptions[] = [
    { value: ProductoUnidadEnum.Pieza, label: ProductoUnidadEnum.Pieza },
    { value: ProductoUnidadEnum.Metro, label: ProductoUnidadEnum.Metro },
    { value: ProductoUnidadEnum.Par, label: ProductoUnidadEnum.Par },
  ];
  return <InputSelect {...props} label={`Unidad`} name={'unidad'} options={options} />;
};
