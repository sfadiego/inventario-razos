import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta, IVentaUpdateProps } from '@/models/venta.interface';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useVentasStore } from '@/pages/Venta/partials/useVentasStore';
import { useServiceDeleteVentaProducto, useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceFinalizarVenta } from '@/Services/ventas/useServiceVenta';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../button/Button';
import { ActualizaProductoVenta } from './partials/ActualizaProductoVenta';
interface rowExpansionContentProps {
    record: IVentaProducto;
    collapse: () => void;
}

export const useProductoVentaDetail = ({ ventaId, closeModal }: { ventaId: number; closeModal: () => void }) => {
    const [refetchDatatable, setrefetchDatatable] = useState<boolean>(false);
    const refetchTable = () => setrefetchDatatable(!refetchDatatable);
    const [selectedId, seSelectedId] = useState<number>(0);
    const { venta, setVenta } = useVentasStore();

    const ventaFinalizada = !!(venta?.status_venta == 'finalizada');
    const renderersMap = {
        rowExpansion: {
            content: ({ record }: rowExpansionContentProps) => {
                return !ventaFinalizada && <ActualizaProductoVenta record={record} refetchDatatable={refetchTable} />;
            },
        },
        actions: ({ id }: IVentaProducto) => (
            <>
                {!ventaFinalizada && (
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
                )}
            </>
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

    const mutatorUpdate = useServiceFinalizarVenta(ventaId);
    const { onSubmit: onSubmitFinalizarVenta } = useOnSubmit<IVentaUpdateProps>({
        mutateAsync: mutatorUpdate.mutateAsync,
        onSuccess: async (data: IVenta) => handleSuccessVenta(data),
    });

    const handleSuccessVenta = (data: IVenta) => {
        setVenta(data);
        closeModal();
        AlertSwal({
            type: AlertTypeEnum.Success,
            options: {
                timer: 2000,
                timerProgressBar: true,
            },
        });
    };

    const mutatorDelete = useServiceDeleteVentaProducto(selectedId);
    const { onSubmit: onSubmitDelete } = useOnSubmit({
        mutateAsync: mutatorDelete.mutateAsync,
        onSuccess: async () => {
            refetchTable();
            seSelectedId(0);
        },
    });
    useEffect(() => {
        refetch();
    }, [refetchDatatable, refetch]);

    const disabled = !!(dataTableProps?.totalRecords == 0 || ventaFinalizada);
    const handleDelete = () => onSubmitDelete(null, {});

    return { dataTableProps, refetch, onSubmitFinalizarVenta, disabled };
};
