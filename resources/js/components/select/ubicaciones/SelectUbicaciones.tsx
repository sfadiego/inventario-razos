import InputSelect from '@/components/form/select/InputSelect';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexUbicaciones } from '@/Services/ubicaciones/useServiceUbicaciones';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectUbicacionesProps {
  formik: FormikProps<any>;
}
export const SelectUbicaciones = (props: ISelectUbicacionesProps) => {
  const { formik } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexUbicaciones,
    filters: [],
    storeKey: `ubicacion-${formik.values.ubicacion_id || 0}`,
  });

  return (
    <InputSelect<IProducto>
      {...props}
      label={`Ubicacion`}
      name={`ubicacion_id`}
      formik={formik}
      options={options}
      onInputChange={handleInputChange}
    />
  );
};
