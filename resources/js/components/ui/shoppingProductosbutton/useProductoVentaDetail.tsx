import { useDataTable } from '@/hooks/useDatatable';
import { useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { Trash } from 'lucide-react';
import Button from '../button/Button';
import { ActualizaProductoVenta } from './partials/ActualizaProductoVenta';

export const useProductoVentaDetail = (ventaId: number) => {
    const renderersMap = {
        rowExpansion: {
            content: (props: any) => <ActualizaProductoVenta {...props.record} />,
        },
        actions: () => (
            <Button
                onClick={() => {
                    console.log('aqui');
                }}
                variant="error"
                size="sm"
            >
                <Trash />
            </Button>
        ),
    };
    const { dataTableProps } = useDataTable({
        service: useServiceVentaProductoDetalle,
        payload: {
            serviceParamId: ventaId,
            filters: [],
        },
        renderersMap,
    });
    return { dataTableProps };
};
