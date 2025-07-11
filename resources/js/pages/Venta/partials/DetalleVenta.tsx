import { Headers } from '@/components/layout/Headers';
import Badge from '@/components/ui/badge/Badge';
import { IVenta } from '@/models/venta.interface';

export const DetalleVenta = ({ venta }: { venta: IVenta }) => {
    const { folio, cliente, venta_total, status_venta } = venta;
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
                <Badge color={`${status !== 'finalizada' ? 'info' : 'error'}`} variant="light">
                    {status}
                </Badge>
            </Headers>
        </>
    );
};
