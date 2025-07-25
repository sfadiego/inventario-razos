import { SelectProducto } from '@/components/select/productos/SelectProducto';
import { SelectTipoMovimiento } from '@/components/select/tipoMovimiento/SelectTipoMovimiento';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';

interface IFormReporteProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const FormReporte = ({ isOpen, closeModal }: IFormReporteProps) => {
    const formikProps = {
        initialValues: {
            nombre: '',
            empresa: '',
            observaciones: '',
        },
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log('Form submitted with values:', values);
            closeModal();
        },
    };
    return (
        <Modal title="Movimiento" subtitle="Crear movimiento de productos" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-3`}>
                        <div className="col-span-12">
                            <SelectTipoMovimiento formik={formik} />
                        </div>
                        <div className="col-span-12 mb-4">
                            <SelectProducto formik={formik} />
                        </div>
                        <div className="col-span-12 mt-3 flex justify-end gap-2">
                            <Button onClick={closeModal} size="sm" variant="outline">
                                Cerrar
                            </Button>
                            <Button size="md" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting}>
                                <Save /> Guardar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
