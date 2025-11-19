import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { MultipleSelectCategorias } from '@/components/select/categorias/MultipleSelectCategorias';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IProveedorFormik } from '@/models/proveedor.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useProveedor } from './useProveedor';

interface IFormProveedorProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const FormProveedor = ({ isOpen, closeModal }: IFormProveedorProps) => {
  const { formikProps, isPending } = useProveedor({ closeModal });
  return (
    <Modal title="Proveedor" subtitle="Crea o actualiza un proveedor" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
      <Formik<IProveedorFormik> enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className={`grid grid-cols-12 gap-3`}>
            <div className="col-span-12 lg:col-span-12">
              <Input<IProveedorFormik> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
              <Input<IProveedorFormik> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 lg:col-span-12">
              <MultipleSelectCategorias name="categorias" formik={formik} />
            </div>

            <div className="col-span-12 mt-3 flex justify-end gap-2">
              <Button onClick={closeModal} size="sm" variant="outline">
                Cerrar
              </Button>
              <Button size="md" type={ButtonTypeEnum.Submit} disabled={isPending || formik.isSubmitting}>
                <Save /> Guardar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
