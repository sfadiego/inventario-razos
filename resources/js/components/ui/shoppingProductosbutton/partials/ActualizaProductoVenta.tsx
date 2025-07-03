import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import Button from '../../button/Button';
import { ButtonTypeEnum } from '../../button/enums/buttonType.enum';
import { useActualizaProductoVenta } from './useActualizaProductoVenta';

export const ActualizaProductoVenta = (item: IVentaProducto) => {
    const { formikProps } = useActualizaProductoVenta({ item });
    const nombreProducto = item.producto?.nombre || '';
    return (
        <>
            <div className="p-4">
                <Formik<IVentaProducto> enableReinitialize {...formikProps}>
                    {(formik) => (
                        <Form className={`grid grid-cols-12 gap-3`}>
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
                            <Button size="md" type={ButtonTypeEnum.Submit} disabled={formik.isSubmitting} className="col-span-12 md:col-span-6">
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
