import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { IProveedor } from '@/models/proveedor.interface';
import { FormikProps } from 'formik';
import { IFiltroProveedor } from '../useProveedoresPage';

interface IFiltrosProductoProps {
    formik: FormikProps<IFiltroProveedor>;
}

export const FiltrosProveedor = ({ formik }: IFiltrosProductoProps) => {
    return (
        <>
            <div className="col-span-12 lg:col-span-12">
                <Input<IProveedor> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
                <Input<IProveedor> label={`Empresa`} name="empresa" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
                <Input<IProveedor> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
            </div>
        </>
    );
};
