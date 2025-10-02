import InputSelect from '@/components/form/select/InputSelect';
import { ISelectProductoProps, useSelectProducto } from './useSelectProducto';

export const SelectProducto = ({ formik, disabled = false }: ISelectProductoProps) => {
  const { options } = useSelectProducto();
  return (
    <InputSelect<any>
      setValue={options.filter((option) => option.value === formik.values.producto_id)}
      label={`Producto`}
      name={`producto_id`}
      formik={formik}
      disabled={disabled}
      options={options}
    />
  );
};
