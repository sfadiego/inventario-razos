import InputSelect from '@/components/form/select/InputSelect';
import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { IProducto } from '@/models/producto.interface';
import { useProductoStore } from '@/pages/Productos/partials/useProductoStore';
import { useServiceIndexMarcas } from '@/Services/marcas/useServiceMarcas';
import { FormikProps } from 'formik';

const useCompareOrAddNewOption = (data: IOptions[]) => {
  // const { producto } = useProductoStore();
  // const existInOriginalData = !!(producto && data?.find((item: IOptions) => item.value === producto?.marca_id));
  // const newOption: IOptions = {
  //   value: producto?.marca?.id ?? 0,
  //   label: producto?.marca?.nombre ?? '',
  // };
  // return producto && data.length && !existInOriginalData ? [...data, newOption] : data;
};
//NOTE: trabajar mejorar store
export const SelectMarcas = ({ formik }: { formik: FormikProps<any> }) => {
  const { isLoading, data } = useServiceIndexMarcas({});
  const defaultValues = [{ value: 0, label: `seleccionar...` }];
  const options = useCompareOrAddNewOption(
    (!isLoading &&
      data?.data.map((item) => ({
        value: item.id ?? 0,
        label: item.nombre,
      }))) ||
      defaultValues,
  );
  return (
    <InputSelect<IProducto>
      setValue={options.filter((option): option is IOptions => option.value === formik.values.marca_id)}
      label={`Marca`}
      name={`marca_id`}
      formik={formik}
      options={options}
    />
  );
};
