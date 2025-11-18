import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { MultipleSelectCategorias } from '@/components/select/categorias/MultipleSelectCategorias';
import { IProveedorFormik } from '@/models/proveedor.interface';
import { FormikProps } from 'formik';

interface IFiltrosProductoProps {
  formik: FormikProps<IProveedorFormik>;
}

export const FiltrosProveedor = ({ formik }: IFiltrosProductoProps) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-12">
        <Input<IProveedorFormik> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
      </div>
      <div className="col-span-12 lg:col-span-12">
        <Input<IProveedorFormik> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
      </div>
      <div className="col-span-12 lg:col-span-12">
        <MultipleSelectCategorias name="categorias" formik={formik} />
      </div>
    </>
  );
};
