import Label from '@/components/form/Label';
import SingleTextArea from '@/components/form/input/SingleTextArea';
import Button from '@/components/ui/button/Button';
import { ButtonTypeEnum } from '@/components/ui/button/enums/buttonType.enum';
import { Modal } from '@/components/ui/modal';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { Coins } from 'lucide-react';
import { DataTable } from 'mantine-datatable';
import { ProductosDevolucion } from '../ProductosDevolucion/ProductosDevolucion';
import { useFormDevolucion } from './useFormDevolucion';

interface IFormDevolucion {
  isOpen: boolean;
  onClose: () => void;
  ventaId: number;
}
export const FormDevolucion = ({ isOpen, onClose, ventaId }: IFormDevolucion) => {
  const {
    rowExpansion,
    venta,
    dataTableProps,
    productosDevolucion,
    handleRemove,
    handleDevolucion,
    setMotivo,
    motivo,
    enableBtnPayload,
    devolucionCreada,
    handleClose,
  } = useFormDevolucion({
    onClose,
    ventaId,
  });

  return (
    <Modal title="Devolución" subtitle="Crear devolución de productos" isOpen={isOpen} onClose={handleClose} className="m-4 max-w-[700px]">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <Label>
            <span className="font-semibold">Folio</span>: {`${venta?.data?.folio || ''}`}
          </Label>
        </div>
        <div className="col-span-12">
          <Label> Motivo devolucion</Label>
          <SingleTextArea disabled={devolucionCreada} id="motivo" onChange={(value) => setMotivo(value || '')} value={motivo} />
        </div>
        <div className="col-span-12 overflow-auto">
          <DataTable<IVentaProducto> {...dataTableProps} rowExpansion={!devolucionCreada ? rowExpansion : undefined} />
        </div>
        {productosDevolucion && productosDevolucion.length > 0 && (
          <ProductosDevolucion disableActions={devolucionCreada} productosDevolucion={productosDevolucion} handleRemove={handleRemove} />
        )}
        <div className="col-span-12 mt-3 flex justify-end gap-2">
          <Button className="col-span-12 lg:col-span-6" onClick={handleClose} size="sm" variant="outline">
            Cerrar
          </Button>
          {!devolucionCreada && (
            <Button
              disabled={!enableBtnPayload || devolucionCreada}
              className="col-span-12 lg:col-span-6"
              size="md"
              type={ButtonTypeEnum.Button}
              onClick={handleDevolucion}
            >
              <Coins /> Generar Devolución
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
