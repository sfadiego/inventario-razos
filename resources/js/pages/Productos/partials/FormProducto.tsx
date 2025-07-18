import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import { SelectCategorias } from '@/components/select/categorias/SelectCategorias';
import { SelectProveedores } from '@/components/select/proveedores/SelectProveedores';
import { SelectUbicaciones } from '@/components/select/ubicaciones/SelectUbicaciones';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IProducto } from '@/models/producto.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useFormProducto } from './useFormProducto';

interface IModalProductoProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const FormProducto = ({ isOpen, closeModal }: IModalProductoProps) => {
    const { formikProps, isPending, disableStock } = useFormProducto({ closeModal });

    return (
        <Modal
            title={`Producto`}
            subtitle={`Crea o actualiza un producto existente`}
            isOpen={isOpen}
            onClose={closeModal}
            className="m-4 max-w-[700px]"
        >
            <Formik enableReinitialize {...formikProps}>
                {(formik) => (
                    <Form className={`grid grid-cols-12 gap-3`}>
                        <div className="col-span-12 lg:col-span-12">
                            <Input<IProducto> label={`Producto`} name="nombre" formik={formik} type={InputTypeEnum.Text} />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input<IProducto> disabled={disableStock} label={`Stock`} name="stock" formik={formik} type={InputTypeEnum.Text} />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input<IProducto>
                                label={`Cantidad minima`}
                                name="cantidad_minima"
                                formik={formik}
                                type={InputTypeEnum.Text}
                                hint={`Cantidad minima para alerta de stock minimo`}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input<IProducto> label={`Precio de compra`} name="precio_compra" formik={formik} type={InputTypeEnum.Text} />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <Input<IProducto> label={`Precio venta`} name="precio_venta" formik={formik} type={InputTypeEnum.Text} />
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <SelectProveedores formik={formik}></SelectProveedores>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <SelectCategorias formik={formik}></SelectCategorias>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <SelectUbicaciones formik={formik}></SelectUbicaciones>
                        </div>
                        <Button size="md" variant="outline" className="col-span-12 md:col-span-6" onClick={closeModal}>
                            Close
                        </Button>
                        <Button
                            size="md"
                            type={ButtonTypeEnum.Submit}
                            disabled={isPending || formik.isSubmitting}
                            className="col-span-12 md:col-span-6"
                        >
                            <Save />
                            Guardar
                        </Button>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
