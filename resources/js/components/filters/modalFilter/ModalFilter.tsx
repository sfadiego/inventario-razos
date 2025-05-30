import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { IModalFilterProps } from './types';

export const ModalFilter = (props: IModalFilterProps) => {
    const { isOpen, validationSchema, children, initialValues, close, onSubmit } = props;

    const handleOnSubmit = (values) => {
        onSubmit(values);
        close();
    };
    return (
        <Modal isOpen={isOpen} onClose={close} className="m-4 max-w-[700px]">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Filtrar Productos</h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Busca un producto existente</p>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
                    {(formik) => (
                        <Form className={`grid grid-cols-12 gap-3`}>
                            {typeof children === 'function' ? children(formik) : children}
                            <div className="col-span-12 mt-3 flex justify-end gap-2">
                                <Button>Borrar</Button>
                                <Button className="" type={ButtonTypeEnum.Submit}>
                                    Filtrar
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};
