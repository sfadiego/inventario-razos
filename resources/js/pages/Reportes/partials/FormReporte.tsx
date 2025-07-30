import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { SelectProducto } from '@/components/select/productos/SelectProducto';
import { SelectTipoMovimiento } from '@/components/select/tipoMovimiento/SelectTipoMovimiento';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { TipoMovimientoEnum } from '@/enums/tipoMovimientoEnum';
import { IInitialValuesReporteMovimiento } from '@/models/reporteMovimiento.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useFormReport } from './useFormReport';

interface IFormReporteProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const FormReporte = ({ isOpen, closeModal }: IFormReporteProps) => {
    const { formikProps } = useFormReport({ closeModal });

    return (
        <Modal title="Movimiento" subtitle="Crear movimiento de productos" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-3`}>
                        <div className="col-span-12">
                            <SelectTipoMovimiento exclude={[`Salida`]} formik={formik} />
                        </div>
                        <div className="col-span-12">
                            <SelectProducto formik={formik} />
                        </div>
                        {formik.values.tipo_movimiento_id === TipoMovimientoEnum.Ajuste && (
                            <div className="col-span-12 lg:col-span-12">
                                <Input<IInitialValuesReporteMovimiento> label={`Motivo`} name="motivo" formik={formik} type={InputTypeEnum.Text} />
                            </div>
                        )}
                        <div className="col-span-12 lg:col-span-12">
                            <Input<IInitialValuesReporteMovimiento>
                                label={`Cantidad a reportar`}
                                name="cantidad"
                                formik={formik}
                                type={InputTypeEnum.Number}
                            />
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
