import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IProveedor } from '@/models/proveedor.interface';
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
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`flex flex-col`}>
                        <div className="custom-scrollbar mb-4 overflow-y-auto px-2">
                            <div className="grid grid-cols-12 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-12 lg:col-span-12">
                                    <Input<IProveedor> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
                                </div>
                                <div className="col-span-12 lg:col-span-12">
                                    <Input<IProveedor> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
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
