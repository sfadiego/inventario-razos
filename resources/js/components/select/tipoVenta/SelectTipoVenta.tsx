import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';
interface ISelectTipoVenta {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectTipoVenta = (props: ISelectTipoVenta) => {
  const options = [
    { value: 'credito', label: `credito` },
    { value: 'contado', label: `contado` },
  ];
  return <InputSelect {...props} label={`Tipo de venta`} name={'tipo_compra'} options={options} />;
};
