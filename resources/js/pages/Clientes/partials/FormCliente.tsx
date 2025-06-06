import Checkbox from '@/components/form/input/Checkbox';
import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { ICliente } from '@/models/cliente.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useCliente } from './useCliente';

export const FormCliente = () => {
    const { formikProps, isPending, isCheckedDisabled, setIsCheckedDisabled } = useCliente();
    return (
        <Formik enableReinitialize {...formikProps}>
            {(formik) => (
                <Form className={`grid grid-cols-12 gap-2 pb-5`}>
                    <div className="col-span-12 mb-3 lg:col-span-12">
                        <Input<ICliente> label={`Nombre`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
                    </div>
                    <div className="col-span-12 mb-3 lg:col-span-12">
                        <Input<ICliente> label={`Observaciones`} name="observaciones" formik={formik} type={InputTypeEnum.Text} />
                    </div>
                    <div className="col-span-12 mb-3 lg:col-span-12">
                        <Checkbox<ICliente>
                            formik={formik}
                            id="confiable"
                            checked={isCheckedDisabled}
                            onChange={setIsCheckedDisabled}
                            label="Confiable"
                        />
                    </div>
                    <div className="col-span-12 mt-3 flex justify-end gap-2">
                        <Button className="col-span-12 mb-3 lg:col-span-6" onClick={() => null} size="sm" variant="outline">
                            Cerrar
                        </Button>
                        <Button
                            className="col-span-12 mb-3 lg:col-span-6"
                            size="md"
                            type={ButtonTypeEnum.Submit}
                            disabled={isPending || formik.isSubmitting}
                        >
                            <Save /> Guardar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
