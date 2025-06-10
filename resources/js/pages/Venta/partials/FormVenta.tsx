import { SelectCliente } from '@/components/select/clientes/SelectCliente';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';

import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { SelectTipoVenta } from '@/components/select/tipoVenta/SelectTipoVenta';
import { IVenta } from '@/models/venta.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useFormVenta } from './useFormVenta';

interface IFormVentaProps {
    nuevocliente: boolean;
}
export const FormVenta = ({ nuevocliente }: IFormVentaProps) => {
    const { formikProps, isPending, disabled, resetVenta } = useFormVenta();
    return (
        <>
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-2 pb-5`}>
                        <div className="col-span-4">
                            <Input<IVenta> disabled={true} label={`Folio`} name="folio" formik={formik} type={InputTypeEnum.Text} />
                        </div>
                        <div className="col-span-4">
                            <Input<IVenta>
                                disabled={disabled}
                                label={`Nombre de Venta`}
                                name="nombre_venta"
                                formik={formik}
                                type={InputTypeEnum.Text}
                            />
                        </div>
                        <div className="col-span-4">
                            <SelectTipoVenta disabled={disabled} formik={formik} />
                        </div>
                        {!nuevocliente && (
                            <>
                                <div className="col-span-12 mt-2">
                                    <SelectCliente disabled={disabled} formik={formik} />
                                </div>
                            </>
                        )}

                        {!nuevocliente && (
                            <div className="col-span-12 mt-3 flex justify-end gap-2">
                                <Button className="col-span-6" onClick={resetVenta} size="sm" variant="outline">
                                    Cancelar
                                </Button>
                                <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} disabled={isPending || formik.isSubmitting}>
                                    <Save /> Continuar
                                </Button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
            {nuevocliente && <hr></hr>}
        </>
    );
};
