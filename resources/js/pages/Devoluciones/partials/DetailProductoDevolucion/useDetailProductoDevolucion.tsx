import { IDevolucionProducto } from '@/models/devolucion';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useCallback, useEffect, useState } from 'react';

interface IuseDetailProductoDevolucion {
  producto: IVentaProducto;
  addProduct: (producto: IDevolucionProducto) => void;
  validateExist: (producto: IDevolucionProducto) => boolean;
}

export const useDetailProductoDevolucion = ({ producto, addProduct, validateExist }: IuseDetailProductoDevolucion) => {
  const [msgValidacion, setMsgValidacion] = useState<string>('');

  const [selected, setSelected] = useState<IDevolucionProducto>({
    producto_id: producto?.producto?.id ?? 0,
    nombre: producto?.producto?.nombre ?? '',
    cantidad: producto?.cantidad ?? 0,
    unidad: producto?.producto?.unidad ?? 'pza',
    precio_unitario: producto?.precio ?? 0,
  });

  useEffect(() => {
    setSelected({
      producto_id: producto?.producto?.id ?? 0,
      nombre: producto?.producto?.nombre ?? '',
      cantidad: producto?.cantidad ?? 0,
      unidad: producto?.producto?.unidad ?? 'pza',
      precio_unitario: producto?.precio ?? 0,
    });
    setMsgValidacion('');
  }, [producto]);

  const handleAgregar = useCallback(() => {
    const { cantidad, precio_unitario } = selected;
    const cantidadMaxima = producto?.cantidad ?? 0;

    if (cantidad <= 0) {
      return setMsgValidacion('La cantidad debe ser mayor a 0');
    }

    if (cantidad > cantidadMaxima) {
      return setMsgValidacion(`La cantidad máxima permitida es ${cantidadMaxima}`);
    }

    if (precio_unitario < 0) {
      return setMsgValidacion('El precio no puede ser negativo');
    }

    if (validateExist(selected)) {
      return setMsgValidacion('Este producto ya está en la lista de devolución');
    }

    setMsgValidacion('');
    addProduct({ ...selected });
  }, [selected, producto, validateExist, addProduct]);

  const handleChange = (field: keyof IDevolucionProducto, value: string | number) => {
    setMsgValidacion('');
    setSelected((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    selected,
    msgValidacion,
    setMsgValidacion,
    handleChange,
    handleAgregar,
  };
};
