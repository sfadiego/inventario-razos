import DatePicker from '@/components/form/datepicker/InputDatePicker';
import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { SelectCliente } from '@/components/select/clientes/SelectCliente';
import { SelectStatusVenta } from '@/components/select/statusVenta/SelectStatusVenta';
import { SelectTipoVenta } from '@/components/select/tipoVenta/SelectTipoVenta';
import { FormikProps } from 'formik';
import { IFiltroVenta } from '../useVentasPage';

interface IFiltrosVentaProps {
  formik: FormikProps<IFiltroVenta>;
}

export const FiltrosVenta = ({ formik }: IFiltrosVentaProps) => {
  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <Input<IFiltroVenta> label={`Nombre de venta`} name="nombre_venta" formik={formik} type={InputTypeEnum.Text} />
      </div>
      <div className="col-span-12 md:col-span-6">
        <Input<IFiltroVenta> label={`Folio de venta`} name="folio" formik={formik} type={InputTypeEnum.Text} />
      </div>
      <div className="col-span-12">
        <DatePicker name="created_at" formik={formik} label="Fecha de venta" />
      </div>
      <div className="col-span-12 mt-2 md:col-span-6">
        <SelectTipoVenta formik={formik} />
      </div>
      <div className="col-span-12 mt-2 md:col-span-6">
        <SelectStatusVenta formik={formik} />
      </div>
      <div className="col-span-12 mt-2">
        <SelectCliente formik={formik} />
      </div>
    </>
  );
};
