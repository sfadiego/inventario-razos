import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useProductoStore } from '@/pages/Productos/partials/useProductoStore';
import { useServiceIndexCategorias } from '@/Services/categorias/useServiceCategorias';

const useCompareOrAddNewOption = (data: IOptions[]) => {
  const { producto } = useProductoStore();
  const existInOriginalData = !!(producto && data?.find((item: IOptions) => item.value === producto?.categoria_id));
  const newOption: IOptions = {
    value: producto?.categoria?.id ?? 0,
    label: producto?.categoria?.nombre ?? '',
  };
  return producto && data.length && !existInOriginalData ? [...data, newOption] : data;
};

export const useSelectCategorias = () => {
  const { isLoading, data } = useServiceIndexCategorias({});
  const defaultValues = [{ value: 0, label: `seleccionar...` }];
  const options = useCompareOrAddNewOption(
    (!isLoading &&
      data?.data.map((item) => ({
        value: item.id ?? 0,
        label: item.nombre,
      }))) ||
      defaultValues,
  );

  return {
    options,
  };
};
