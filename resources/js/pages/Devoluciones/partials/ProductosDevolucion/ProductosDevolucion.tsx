import Label from '@/components/form/Label';
import { IDevolucionProducto } from '@/models/devolucion';

export const ProductosDevolucion = ({
  productosDevolucion,
  handleRemove,
}: {
  productosDevolucion: IDevolucionProducto[];
  handleRemove: (id: number) => void;
}) => {
  return (
    <div className="col-span-12">
      <Label> Productos para devolución : </Label>
      <ul className="list-none">
        {productosDevolucion?.map((producto: IDevolucionProducto) => (
          <li key={producto.producto_id} className="cursor-pointer p-2 hover:bg-gray-100">
            <Label>
              {producto.cantidad} {producto.unidad} | {producto.nombre}
              <span className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemove(producto.producto_id)}>
                Quitar
              </span>
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
};
