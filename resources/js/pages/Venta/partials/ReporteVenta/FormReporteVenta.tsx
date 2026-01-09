import DatePicker from '@/components/form/datepicker/InputDatePicker';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { formatDate } from '@/helper/dates';
import { Save } from 'lucide-react';
import { useFormReporteVenta } from './useFormReporteVenta';

interface IFormVentaProps {
  isOpen: boolean;
  closeModal: () => void;
}
export const FormReporteVenta = ({ isOpen, closeModal }: IFormVentaProps) => {
  const { download, setSelectedDate } = useFormReporteVenta();

  return (
    <Modal isOpen={isOpen} title="Reporte de Venta" onClose={closeModal} className="m-4 max-w-[700px]">
      <div className={`grid grid-cols-12 gap-2 pt-3 pb-5`}>
        <div className="col-span-12 lg:col-span-12">
          <DatePicker onChange={(date) => setSelectedDate(formatDate(date))} name="fecha_inicio" label="Fecha de inicio" />
        </div>
        <div className="col-span-12 mt-3 flex justify-end gap-2">
          <Button className="col-span-6" onClick={() => closeModal()} size="sm" variant="outline">
            Cancelar
          </Button>
          <Button className="col-span-6" size="md" type={ButtonTypeEnum.Submit} onClick={download}>
            <Save /> Generar reporte
          </Button>
        </div>
      </div>
    </Modal>
  );
};
