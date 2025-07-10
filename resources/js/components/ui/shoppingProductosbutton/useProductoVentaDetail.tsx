import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta, IVentaUpdateProps } from '@/models/venta.interface';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceDeleteVentaProducto, useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceUpdateVenta } from '@/Services/ventas/useServiceVenta';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../button/Button';
import { ActualizaProductoVenta } from './partials/ActualizaProductoVenta';
interface rowExpansionContentProps {
    record: IVentaProducto;
    collapse: () => void;
}

export const useProductoVentaDetail = (ventaId: number) => {
    const [refetchDatatable, setrefetchDatatable] = useState<boolean>(false);
    const refetchTable = () => setrefetchDatatable(!refetchDatatable);
    const [selectedId, seSelectedId] = useState<number>(0);
    const renderersMap = {
        rowExpansion: {
            content: ({ record }: rowExpansionContentProps) => {
                return <ActualizaProductoVenta record={record} refetchDatatable={refetchTable} />;
            },
        },
        actions: ({ id }: IVentaProducto) => (
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    seSelectedId(id);
                    handleDelete();
                }}
                variant="error"
                size="sm"
            >
                <Trash />
            </Button>
        ),
    };
    //TODO: arreglar tipado de renderersMap
    const { dataTableProps, refetch } = useDataTable({
        service: useServiceVentaProductoDetalle,
        payload: {
            serviceParamId: ventaId,
            filters: [],
        },
        renderersMap,
    });
    // console.log(dataTableProps?.totalRecords);

    const mutatorUpdate = useServiceUpdateVenta(ventaId);
    const { onSubmit: onSubmitFinalizarVenta } = useOnSubmit<IVentaUpdateProps>({
        mutateAsync: mutatorUpdate.mutateAsync,
        onSuccess: async (data: IVenta) => handleSuccessVenta(data),
    });
    // const validate
    const handleSuccessVenta = (data: IVenta) => {
        console.log('handleSuccessVenta', data);
    };

    const mutatorDelete = useServiceDeleteVentaProducto(selectedId);
    const { onSubmit: onSubmitDelete } = useOnSubmit({
        mutateAsync: mutatorDelete.mutateAsync,
        onSuccess: async () => {
            refetchTable()
            seSelectedId(0);
        },
    });

    useEffect(() => {
        refetch();
    }, [refetchDatatable, refetch]);

    const handleDelete = () => onSubmitDelete(null, {});

    return { dataTableProps, refetch, onSubmitFinalizarVenta };
};
