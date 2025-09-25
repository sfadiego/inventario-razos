import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { useClienteStore } from '@/pages/Clientes/partials/useClienteStore';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { FormikProps } from 'formik';
import { useEffect } from 'react';

export interface ISelectClienteProps {
  disabled?: boolean;
  formik: FormikProps<any>;
  onChange?: (option: any) => void;
}

const useCompareOrAddNewOption = (data: IOptions[]) => {
  const { cliente } = useClienteStore();
  const existInOriginalData = !!(cliente && data?.find((item: IOptions) => item.value === cliente?.id));
  const newOption: IOptions = {
    value: cliente?.id ?? 0,
    label: cliente?.nombre ?? '',
  };
  return cliente && data.length && !existInOriginalData ? [...data, newOption] : data;
};

export const useSelectCliente = ({ formik, onChange }: ISelectClienteProps) => {
  const { isLoading, data } = useServiceIndexClientes({});
  const defaultValues = [{ value: 0, label: `seleccionar...` }];
  const options = useCompareOrAddNewOption(
    (!isLoading &&
      data?.data.map((item) => ({
        value: item.id ?? 0,
        label: item.nombre,
      }))) ||
      defaultValues,
  );

  useEffect(() => {
    onChange && handleChange(formik.values.cliente_id);
  }, [formik.values.cliente_id]);

  const handleChange = async (id: number) => onChange && onChange(id);

  return { options, handleChange };
};
