import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { FormikProps } from 'formik';
import { IFiltrosUbicacion } from './useUbicacion';

interface IFiltrosUbicacionesProps {
  formik: FormikProps<IFiltrosUbicacion>;
}
export const FiltroUbicaciones = ({ formik }: IFiltrosUbicacionesProps) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-12">
        <Input<IFiltrosUbicacion> label={`Ubicacion`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
      </div>
    </>
  );
};
