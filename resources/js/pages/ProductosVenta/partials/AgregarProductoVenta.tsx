import { InputTypeEnum } from '@/components/form/input/enum/InputType.enum';
import Input from '@/components/form/input/InputField';
import Alert from '@/components/ui/alert/Alert';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IVentaProductoForm } from '@/models/ventaProducto.interface';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useAgregarProductoVenta } from './useAgregarProductoVenta';

interface IModalAgregarProductoVentaProps {
  isOpen: boolean;
  closeModal: () => void;
  productoId?: number;
}

export const AgregarProductoVenta = (props: IModalAgregarProductoVentaProps) => {
  const { isOpen, closeModal, productoId = 0 } = props;
  const { formikProps, isPending, onErrorMessage, stock } = useAgregarProductoVenta({ closeModal, productoId });
  return (
    <Modal
      title={`Agregar Producto`}
      subtitle={`Agrega o actualiza un producto en el carrito de compras`}
      isOpen={isOpen}
      onClose={closeModal}
      className="m-4 max-w-[700px]"
    >
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <Form className={`grid grid-cols-12 gap-3`}>
            {onErrorMessage && (
              <div className="col-span-12">
                <Alert variant="error" title="Error" message={onErrorMessage} />
              </div>
            )}
            <div className="col-span-12 md:col-span-12">
              <Input<IVentaProductoForm>
                label={`Nombre de producto`}
                disabled={true}
                name="producto_nombre"
                formik={formik}
                type={InputTypeEnum.Text}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input<IVentaProductoForm> label={`Cantidad`} name="cantidad" formik={formik} type={InputTypeEnum.Text} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input<IVentaProductoForm> label={`Precio`} name="precio" formik={formik} type={InputTypeEnum.Text} />
              <Input<IVentaProductoForm> label={`Producto`} name="producto_id" formik={formik} type={InputTypeEnum.Hidden} />
              <Input<IVentaProductoForm> label={`Venta`} name="venta_id" formik={formik} type={InputTypeEnum.Hidden} />
            </div>
            <div className="col-span-12">
              <Badge color="warning" variant="light">
                Stock: {stock}
              </Badge>
            </div>
            <hr className="col-span-12 mt-4" />
            <Button size="md" variant="outline" className="col-span-6 md:col-span-6" onClick={closeModal}>
              Close
            </Button>
            <Button size="md" type={ButtonTypeEnum.Submit} disabled={isPending || formik.isSubmitting} className="col-span-6 md:col-span-6">
              <Save />
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
