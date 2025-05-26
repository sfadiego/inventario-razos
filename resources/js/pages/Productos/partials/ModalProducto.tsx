import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { useProduct } from './useProduct';

interface IModalProductoProps {
    isOpen: boolean;
    closeModal: () => void;
}
export const ModalProducto = ({ isOpen, closeModal }: IModalProductoProps) => {
    const { initialValues, validationSchema, onSubmit } = useProduct();

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Producto</h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Crea o actualiza un producto existente</p>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(formik) => (
                        <Form className={`flex flex-col`}>
                            <div className="custom-scrollbar overflow-y-auto px-2">
                                <div className="grid grid-cols-12 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-12 lg:col-span-12">
                                        <Input label={`Producto`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                                <Button size="sm" variant="outline">
                                    Close
                                </Button>
                                <Button size="sm" onClick={() => null}>
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
