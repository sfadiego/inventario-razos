import InputSelect from '@/components/form/select/InputSelect';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectProveedoresProps {
  formik: FormikProps<any>;
}
export const SelectProveedores = (props: ISelectProveedoresProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexProveedor,
    filters: [],
    storeKey: `proveedor-${formik.values.proveedor_id || 0}`,
  });

  return (
    <InputSelect<IProducto>
      {...props}
      label={`Proveedor`}
      name={`proveedor_id`}
      formik={formik}
      options={options}
      onInputChange={handleInputChange}
    />
  );
};
