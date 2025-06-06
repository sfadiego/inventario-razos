import { SelectCliente } from '@/components/select/clientes/SelectCliente';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';

import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useFormVenta } from './useFormVenta';

interface IFormVentaProps {
    nuevocliente: boolean;
}
export const FormVenta = ({ nuevocliente }: IFormVentaProps) => {
    const { formikProps, isPending } = useFormVenta();
    return (
        <>
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-2 pb-5`}>
                        <div className="col-span-12">
                            <div className="space-y-6">{!nuevocliente && <SelectCliente formik={formik}></SelectCliente>}</div>
                        </div>
                        {!nuevocliente && (
                            <div className="col-span-12 mt-3 flex justify-end gap-2">
                                <Button className="col-span-6" onClick={() => null} size="sm" variant="outline">
                                    Cerrar
                                </Button>
                                <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} disabled={isPending || formik.isSubmitting}>
                                    <Save /> Guardar
                                </Button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
};
