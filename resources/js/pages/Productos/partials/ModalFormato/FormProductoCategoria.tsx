import { SelectCategorias } from '@/components/select/categorias/SelectCategorias';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { Form, Formik } from 'formik';
import { File } from 'lucide-react';
import { useFormProductoCategoria } from './useFormProductoCategoria';

import Checkbox from '@/components/form/input/Checkbox';

export const FormProductoCategoria = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const { formikProps, printOptions, setPrintOptions, handleChange } = useFormProductoCategoria();
  const { printBarcode, printImage } = printOptions;

  return (
    <Modal isOpen={isOpen} title="Formato de Productos" onClose={closeModal} className="m-4 max-w-[700px]">
      <Formik enableReinitialize {...formikProps}>
        {(formik) => (
          <>
            <Form className={`grid grid-cols-12 gap-2 pt-3 pb-5`}>
              <div className="col-span-12">
                <SelectCategorias onChange={handleChange} formik={formik} />
              </div>
              <div className="col-span-12">
                <Checkbox
                  formik={formik}
                  checked={printBarcode}
                  onChange={(checked) => setPrintOptions({ ...printOptions, printBarcode: checked })}
                  label="Imprimir código de barras"
                />
              </div>
              <div className="col-span-12">
                <Checkbox
                  formik={formik}
                  checked={printImage}
                  onChange={(checked) => setPrintOptions({ ...printOptions, printImage: checked })}
                  label="Imprimir Imagen"
                />
              </div>
              <div className="col-span-12 mt-3 flex justify-end gap-2">
                <Button className="col-span-6" onClick={() => closeModal()} size="sm" variant="outline">
                  Cancelar
                </Button>
                <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} disabled={!formik.values.categoria_id || formik.isSubmitting}>
                  <File /> Generar reporte
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};
