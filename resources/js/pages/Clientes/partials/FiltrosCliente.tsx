import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { FormikProps } from 'formik';
import { IFiltroCliente } from '../useClientesPage';

interface IFiltrosClienteProps {
    formik: FormikProps<IFiltroCliente>;
}

export const FiltrosCliente = ({ formik }: IFiltrosClienteProps) => {
    return (
        <>
            <div className="col-span-12 lg:col-span-12">
                <Input<IFiltroCliente> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
                <Input<IFiltroCliente> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
            </div>
        </>
    );
};
