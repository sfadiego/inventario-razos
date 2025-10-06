import InputSelect from '@/components/form/select/InputSelect';
import { FormikProps } from 'formik';
interface ISelectStatusVenta {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectStatusVenta = ({ formik, disabled = false }: ISelectStatusVenta) => {
  const options = [
    { value: 'activa', label: `activa` },
    { value: 'finalizada', label: `finalizada` },
  ];
  return (
    <InputSelect
      setValue={options.filter((option) => option.value === formik.values.status_venta)}
      label={`Estatus de venta`}
      name={'status_venta'}
      formik={formik}
      disabled={disabled}
      options={options}
    />
  );
};
