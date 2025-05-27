import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { IProveedor } from '@/models/proveedor.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useProveedor } from './useProveedor';

interface IModalProveedorProps {
    isOpen: boolean;
    closeModal: () => void;
}
export const ModalProveedor = ({ isOpen, closeModal }: IModalProveedorProps) => {
    const { initialValues, validationSchema, onSubmit } = useProveedor();
    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Proveedor</h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Crea o actualiza un proveedor</p>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form className={`flex flex-col`}>
                            <div className="custom-scrollbar mb-4 overflow-y-auto px-2">
                                <div className="grid grid-cols-12 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-12 lg:col-span-12">
                                        <Input<IProveedor> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
                                    </div>
                                    <div className="col-span-12 lg:col-span-12">
                                        <Input<IProveedor> label={`Empresa`} name="empresa" formik={formik} type={InputTypeEnum.Text} />
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
                                <Button startIcon={<Save />} size="sm" onClick={() => null}>
                                    Guardar
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
