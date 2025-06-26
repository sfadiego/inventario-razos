import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Switch from '@/components/form/switch/Switch';
import { SelectCliente } from '@/components/select/clientes/SelectCliente';
import { SelectTipoVenta } from '@/components/select/tipoVenta/SelectTipoVenta';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IVenta } from '@/models/venta.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { useFormVenta } from './useFormVenta';

interface IFormVentaProps {
    isOpen: boolean;
    closeModal: () => void;
}
export const FormVenta = ({ isOpen, closeModal }: IFormVentaProps) => {
    const { formikProps, isPending, disabled, resetVenta, ventaActual } = useFormVenta();
    const [nuevocliente, setNuevocliente] = useState(false);
    return (
        <Modal isOpen={isOpen} title="Nueva venta" onClose={closeModal} className="m-4 max-w-[700px]">
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <>
                        <Form className={`grid grid-cols-12 gap-2 pt-3 pb-5`}>
                            <div className="col-span-12 flex justify-end">
                                <Switch disabled={disabled} label="Cliente nuevo" defaultChecked={nuevocliente} onChange={setNuevocliente} />
                            </div>
                            <div className="col-span-12">
                                <Input<IVenta> disabled={true} label={`Folio`} name="folio" formik={formik} type={InputTypeEnum.Text} />
                            </div>
                            <div className="col-span-12">
                                <Input<IVenta>
                                    disabled={disabled}
                                    label={`Nombre de Venta`}
                                    name="nombre_venta"
                                    formik={formik}
                                    type={InputTypeEnum.Text}
                                />
                            </div>
                            <div className="col-span-12">
                                <SelectTipoVenta disabled={disabled} formik={formik} />
                            </div>
                            {!nuevocliente && (
                                <>
                                    <div className="col-span-12 mt-2">
                                        <SelectCliente disabled={disabled} formik={formik} />
                                    </div>
                                </>
                            )}
                            {!nuevocliente && !ventaActual?.id && (
                                <div className="col-span-12 mt-3 flex justify-end gap-2">
                                    <Button className="col-span-6" onClick={resetVenta} size="sm" variant="outline">
                                        Cancelar
                                    </Button>
                                    <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} disabled={isPending || formik.isSubmitting}>
                                        <Save /> Crear venta
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </>
                )}
            </Formik>
        </Modal>
    );
};
