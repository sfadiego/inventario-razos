import InputSelect from '@/components/form/select/InputSelect';
import { useServiceIndexTipoMovimiento } from '@/Services/tipoMovimiento/useServiceTipoMovimiento';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';
import { filterOptions } from './useSelectTipoMovimiento';

interface ISelectTipoMovimiento {
  disabled?: boolean;
  formik: FormikProps<any>;
  exclude?: string[];
}
export const SelectTipoMovimiento = (props: ISelectTipoMovimiento) => {
  const { formik, exclude = [] } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexTipoMovimiento,
    filters: [],
    storeKey: `tipo-movimiento-${formik.values.tipo_movimiento_id || 0}`,
  });
  return (
    <InputSelect
      {...props}
      label={`Tipo de movimiento`}
      name={'tipo_movimiento_id'}
      formik={formik}
      options={filterOptions(options, exclude)}
      onInputChange={handleInputChange}
    />
  );
};
