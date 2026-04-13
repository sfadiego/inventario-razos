import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useServiceIndexMarcas } from '@/Services/marcas/useServiceMarcas';
import { FormikProps } from 'formik';
import { useSelectService } from '../useSelectService';

interface ISelectMarcasProps {
  formik: FormikProps<any>;
  className?: string;
  selectedOption?: IOptions | null;
}
export const SelectMarcas = (props: ISelectMarcasProps) => {
  const { formik, selectedOption } = props;
  const { options, handleInputChange } = useSelectService({
    useService: useServiceIndexMarcas,
    filters: [],
    storeKey: `marca-${formik.values.marca_id || 0}`,
    selectedOption,
  });

  return <InputSelect<IProducto> {...props} label={`Marca`} name={`marca_id`} formik={formik} options={options} onInputChange={handleInputChange} />;
};
