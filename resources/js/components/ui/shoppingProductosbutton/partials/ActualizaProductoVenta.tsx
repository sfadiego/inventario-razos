import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Alert from '../../alert/Alert';
import Button from '../../button/Button';
import { ButtonTypeEnum } from '../../button/enums/buttonType.enum';
import { useActualizaProductoVenta } from './useActualizaProductoVenta';
interface ActualizaProductoVentaProps {
    refetchDatatable?: boolean;
    setrefetchDatatable?: Dispatch<SetStateAction<boolean>>;
    record: IVentaProducto;
}
export const ActualizaProductoVenta = (props: ActualizaProductoVentaProps) => {
    const { record } = props;
    const { formikProps, isPending, onErrorMessage } = useActualizaProductoVenta(props);
    const nombreProducto = record.producto?.nombre || '';
    return (
        <>
            <div className="p-4">
                <Formik<IVentaProducto> enableReinitialize {...formikProps}>
                    {(formik) => (
                        <Form className={`grid grid-cols-12 gap-3`}>
                            {onErrorMessage && (
                                <div className="col-span-12">
                                    <Alert variant="error" title="Error" message={onErrorMessage} />
                                </div>
                            )}
                            <div className="col-span-12 lg:col-span-12">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
                                    {nombreProducto}
                                </h2>
                                <Input<IVentaProducto> label={`Producto`} name="producto_id" formik={formik} type={InputTypeEnum.Hidden} />
                                <Input<IVentaProducto> label={`Venta`} name="venta_id" formik={formik} type={InputTypeEnum.Hidden} />
                            </div>
                            <div className="col-span-6 lg:col-span-6">
                                <Input<IVentaProducto> label={`Precio`} name="precio" formik={formik} type={InputTypeEnum.Text} />
                            </div>
                            <div className="col-span-6 lg:col-span-6">
                                <Input<IVentaProducto> label={`Cantidad`} name="cantidad" formik={formik} type={InputTypeEnum.Text} />
                            </div>
                            <Button
                                size="md"
                                type={ButtonTypeEnum.Submit}
                                disabled={isPending || formik.isSubmitting}
                                className="col-span-12 md:col-span-6"
                            >
                                <Save />
                                Actualizar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
