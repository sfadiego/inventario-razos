import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { ISubcategoriaForm } from '@/models/subcategoria.interface';
import { FormikProps } from 'formik';

interface IFiltrosSubcategoriaProps {
  formik: FormikProps<ISubcategoriaForm>;
}

export const FiltroSubcategoria = ({ formik }: IFiltrosSubcategoriaProps) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-12">
        <Input<ISubcategoriaForm> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
      </div>
    </>
  );
};
