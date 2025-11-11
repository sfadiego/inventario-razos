import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IMarca } from '@/models/marca.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useMarcaForm } from './useMarcaForm';

interface IFormMarcaProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const FormMarca = ({ isOpen, closeModal }: IFormMarcaProps) => {
  const { formikProps, isPending } = useMarcaForm({ closeModal });
  return (
    <Modal title="Marca" subtitle="Crea o actualiza una marca" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
      <Formik<IMarca> enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className={`grid grid-cols-12 gap-3`}>
            <div className="col-span-12 lg:col-span-12">
              <Input<IMarca> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
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
