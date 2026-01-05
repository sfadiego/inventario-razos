import InputSelect from '@/components/form/select/InputSelect';
import { StatusVentaEnum } from '@/enums/StatusVentaEnum';
import { FormikProps } from 'formik';
interface ISelectStatusVenta {
  disabled?: boolean;
  formik: FormikProps<any>;
}
export const SelectStatusVenta = (props: ISelectStatusVenta) => {
  const options = [
    { value: StatusVentaEnum.ACTIVA, label: StatusVentaEnum.ACTIVA },
    { value: StatusVentaEnum.FINALIZADA, label: StatusVentaEnum.FINALIZADA },
  ];
  return <InputSelect {...props} label={`Estatus de venta`} name={'status_venta'} options={options} />;
};
