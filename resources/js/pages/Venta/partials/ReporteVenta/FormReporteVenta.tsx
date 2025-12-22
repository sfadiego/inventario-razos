import DatePicker from '@/components/form/datepicker/InputDatePicker';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { Save } from 'lucide-react';
import { useFormReporteVenta } from './useFormReporteVenta';

interface IFormVentaProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const FormReporteVenta = ({ isOpen, closeModal }: IFormVentaProps) => {
  const { formikProps, pdfLoading } = useFormReporteVenta();

  return (
    <Modal isOpen={isOpen} title="Reporte de Venta" onClose={closeModal} className="m-4 max-w-[700px]">
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <>
            <Form className={`grid grid-cols-12 gap-2 pt-3 pb-5`}>
              <div className="col-span-12 lg:col-span-6">
                <DatePicker name="fechaInicio" formik={formik} label="Fecha inicio" />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <DatePicker name="fechaFin" formik={formik} label="Fecha fin" />
              </div>

              <div className="col-span-12 mt-3 flex justify-end gap-2">
                <Button className="col-span-6" onClick={() => closeModal()} size="sm" variant="outline">
                  Cancelar
                </Button>
                <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} disabled={pdfLoading || formik.isSubmitting}>
                  <Save /> Generar reporte
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};
