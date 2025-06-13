import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik, FormikProps } from 'formik';
import { IModalFilterProps } from './types';

export const ModalFilter = (props: IModalFilterProps) => {
    const { isOpen, validationSchema, children, initialValues, close, onSubmit } = props;

    const onClear = (formik: FormikProps<typeof initialValues>) => {
        formik.resetForm({ values: initialValues });
    };

    const handleOnSubmit = (values: any) => {
        onSubmit(values);
        close();
    };
    return (
        <Modal title="Filtros" isOpen={isOpen} onClose={close} className="m-4 max-w-[700px]">
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-3`}>
                        {typeof children === 'function' ? children(formik) : children}
                        <div className="col-span-12 mt-3 flex justify-end gap-2">
                            <Button onClick={() => onClear(formik)}>Borrar</Button>
                            <Button className="" type={ButtonTypeEnum.Submit}>
                                Filtrar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
