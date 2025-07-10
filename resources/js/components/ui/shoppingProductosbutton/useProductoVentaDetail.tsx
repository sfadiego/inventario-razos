import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useServiceDeleteVentaProducto, useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
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
    const [selectedId, seSelectedId] = useState<number>(0);
    const renderersMap = {
        rowExpansion: {
            content: ({ record }: rowExpansionContentProps) => {
                return <ActualizaProductoVenta record={record} refetchDatatable={refetchDatatable} setrefetchDatatable={setrefetchDatatable} />;
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

    const mutatorDelete = useServiceDeleteVentaProducto(selectedId);
    const { onSubmit } = useOnSubmit({
        mutateAsync: mutatorDelete.mutateAsync,
        onSuccess: async () => {
            setrefetchDatatable(!refetchDatatable);
            seSelectedId(0);
        },
    });

    useEffect(() => {
        refetch();
    }, [refetchDatatable, refetch]);

    const handleDelete = () => onSubmit(null, {});

    return { dataTableProps, refetch };
};
