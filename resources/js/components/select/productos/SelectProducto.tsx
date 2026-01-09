import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectProductoProps {
  disabled?: boolean;
  formik: FormikProps<any>;
}

export const SelectProducto = (props: ISelectProductoProps) => {
  const { formik, disabled } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexProductos,
    storeKey: `producto-${formik.values.producto_id || 0}`,
    concatProperty: 'codigo',
  });
  return (
    <InputSelect<any>
      {...props}
      label={`Producto`}
      name={`producto_id`}
      formik={formik}
      disabled={disabled}
      options={options}
      onInputChange={handleInputChange}
    />
  );
};
