import InputSelect from '@/components/form/select/InputSelect';
import { TipoVentaEnum } from '@/types/TipoVentaTypes';
import { FormikProps } from 'formik';

interface ISelectTipoVenta {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectTipoVenta = (props: ISelectTipoVenta) => {
  const options = [
    { value: TipoVentaEnum.CREDITO, label: TipoVentaEnum.CREDITO },
    { value: TipoVentaEnum.CONTADO, label: TipoVentaEnum.CONTADO },
  ];
  return <InputSelect {...props} label={`Tipo de venta`} name={'tipo_compra'} options={options} />;
};
