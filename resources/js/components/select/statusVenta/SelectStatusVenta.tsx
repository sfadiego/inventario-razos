import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';
interface ISelectStatusVenta {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectStatusVenta = (props: ISelectStatusVenta) => {
  const options = [
    { value: 'activa', label: `activa` },
    { value: 'finalizada', label: `finalizada` },
  ];
  return <InputSelect {...props} label={`Estatus de venta`} name={'status_venta'} options={options} />;
};
