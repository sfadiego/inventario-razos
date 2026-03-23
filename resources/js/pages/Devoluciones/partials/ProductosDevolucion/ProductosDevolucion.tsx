import Label from '@/components/form/Label';
import { IDevolucionProducto } from '@/models/devolucion';

export const ProductosDevolucion = ({
  productosDevolucion,
  handleRemove,
  hasDevolucion,
}: {
  productosDevolucion: IDevolucionProducto[];
  handleRemove: (id: number) => void;
  hasDevolucion: boolean;
}) => {
  return (
    <div className="col-span-12">
      <Label> {`Productos ${hasDevolucion ? 'devueltos' : 'para devolución'}`}: </Label>
      <ul className="list-none">
        {productosDevolucion?.map((producto: IDevolucionProducto) => (
          <li key={producto.producto_id} className="cursor-pointer p-2 hover:bg-gray-100">
            <Label>
              {producto.cantidad} {producto.unidad} | {producto.nombre}
              {!hasDevolucion && (
                <span className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemove(producto.producto_id)}>
                  Quitar
                </span>
              )}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};
