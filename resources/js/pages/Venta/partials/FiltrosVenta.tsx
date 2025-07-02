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
            <div className="col-span-12 lg:col-span-12">
                <Input<IFiltroVenta> label={`Nombre de venta`} name="nombre_venta" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
                <Input<IFiltroVenta> label={`Folio`} name="folio" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-12">
                <SelectTipoVenta formik={formik} />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-12">
                <SelectCliente formik={formik} />
            </div>
            <div className="col-span-12 mt-2 lg:col-span-12">
                <SelectStatusVenta formik={formik} />
            </div>
        </>
    );
};
