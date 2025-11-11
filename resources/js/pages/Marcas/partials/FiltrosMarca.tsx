import Input from '@/components/form/input/InputField';
import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import { IMarca } from '@/models/marca.interface';
import { FormikProps } from 'formik';

interface IFiltrosMarcaProps {
  formik: FormikProps<IMarca>;
}

export const FiltrosMarca = ({ formik }: IFiltrosMarcaProps) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-12">
        <Input<IMarca> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
      </div>
    </>
  );
};
