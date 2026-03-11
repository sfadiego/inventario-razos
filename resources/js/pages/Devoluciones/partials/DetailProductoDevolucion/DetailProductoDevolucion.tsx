import SingleInputField from '@/components/form/input/SingleInputField';
import Label from '@/components/form/Label';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { IDevolucionProducto } from '@/models/devolucion';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface IDetailProductoDevolucion {
  producto: any;
  addProduct: (producto: any) => void;
  validateExist: (producto: IDevolucionProducto) => boolean;
}
export const DetailProductoDevolucion = ({ producto, addProduct, validateExist }: IDetailProductoDevolucion) => {
  const [msgValidacion, setMsgValidacion] = useState<string>('');
  const [selected, setselected] = useState<IDevolucionProducto>({
    producto_id: producto?.producto?.id || 0,
    nombre: producto?.producto?.nombre || '',
    cantidad: producto?.cantidad || 0,
    unidad: producto?.producto?.unidad || 'pza',
    precio_unitario: producto?.precio || 0,
  });
  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      <div className="col-span-12">
        <Label>
          Producto: <span className="break-words">{`${producto?.producto.nombre || ''}`}</span>
        </Label>

        {msgValidacion && (
          <Badge color="warning" variant="light">
            {msgValidacion}
          </Badge>
        )}
      </div>

      <div className="col-span-6">
        <Label>Precio </Label>
        <SingleInputField
          name="precio_unitario"
          onChange={(e) => {
            setselected((prev: any) => {
              if (!prev) return prev;
              return {
                ...prev,
                precio_unitario: e.target.value ? parseInt(e.target.value) : 0,
              };
            });
          }}
          value={selected.precio_unitario}
        />
        <SingleInputField name="ventaId" type="hidden" />
      </div>
      <div className="col-span-6">
        <Label>Cantidad </Label>
        <SingleInputField
          onChange={(e) => {
            setselected((prev: any) => {
              if (!prev) return prev;
              return {
                ...prev,
                cantidad: e.target.value ? parseInt(e.target.value) : 0,
              };
            });
          }}
          value={selected.cantidad}
          name="cantidad"
        />
      </div>
      <div className="col-span-2">
        <Label>Agregar </Label>
        <Button
          onClick={() => {
            if (validateExist(selected)) {
              setMsgValidacion('El Producto ya se agregó');
              return;
            }
            if (selected.cantidad <= 0 || selected.precio_unitario <= 0) {
              setMsgValidacion('La cantidad y el precio deben ser mayores a 0');
              return;
            }
            addProduct({
              producto_id: selected.producto_id,
              nombre: selected.nombre,
              unidad: selected.unidad,
              precio_unitario: selected.precio_unitario,
              cantidad: selected.cantidad,
            });
          }}
          variant="outline"
        >
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
};
