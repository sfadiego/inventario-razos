import { Headers } from '@/components/layout/Headers';
import Badge from '@/components/ui/badge/Badge';
import { StatusVentaEnum } from '@/enums/StatusVentaEnum';
import { IVenta } from '@/models/venta.interface';
import { useMemo } from 'react';

export const DetalleVenta = ({ venta }: { venta: IVenta }) => {
  const { folio, cliente, venta_total, status_venta } = venta;
  const ventaConDevoluciones = useMemo(() => venta?.devoluciones && venta?.devoluciones.length > 0, [venta]);
  // console.log(ventaConDevoluciones);
  const nombreCliente = cliente?.nombre ?? '';
  const status = status_venta ?? '';
  return (
    <>
      <Headers size="sm" type={`h1`}>
        Folio: {folio}
      </Headers>
      <Headers size="sm" type={`h2`}>
        Total: ${venta_total}
      </Headers>
      {cliente?.nombre && (
        <Headers size="sm" type={`h3`}>
          Cliente: {nombreCliente}
        </Headers>
      )}
      <Headers size="sm" type={`h3`}>
        Estatus:
        <Badge color={`${status !== StatusVentaEnum.FINALIZADA ? 'info' : 'error'}`} variant="light">
          {status}
        </Badge>
      </Headers>
      {ventaConDevoluciones && (
        <Headers size="sm" type={`h3`}>
          <Badge color="warning" variant="light">
            Esta venta tuvo devoluciones
          </Badge>
        </Headers>
      )}
    </>
  );
};
