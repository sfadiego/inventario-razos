import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { useDataTable } from '@/hooks/useDatatable';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IVenta, IVentaUpdateProps } from '@/models/venta.interface';
import { IVentaProducto } from '@/models/ventaProducto.interface';
import { useVentasStore } from '@/pages/Venta/partials/useVentasStore';
import { useServiceIndexProductos } from '@/Services/productos/useServiceProductos';
import { useServiceDeleteVentaProducto, useServiceVentaProductoDetalle } from '@/Services/ventaProducto/useServiceVentaProducto';
import { useServiceFinalizarVenta } from '@/Services/ventas/useServiceVenta';
import { Trash } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../button/Button';
import { ActualizaProductoVenta } from './partials/ActualizaProductoVenta';

export const useProductoVentaDetail = ({ closeModal }: { closeModal: () => void }) => {
    const { id } = useParams();
    const ventaId = id !== undefined ? Number(id) : 0;
    const [reloadFlag, setReloadFlag] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const { venta, setVenta } = useVentasStore();
    const triggerReload = useCallback(() => {
        setReloadFlag((prev) => !prev);
    }, []);

    const ventaFinalizada = !!(venta?.status_venta == 'finalizada');
    const { refetch: refetchProducto } = useServiceIndexProductos({});
    const mutatorDeleteProducto = useServiceDeleteVentaProducto(selectedId);
    const mutatorUpdate = useServiceFinalizarVenta(ventaId);

    const { onSubmit: onSubmitFinalizarVenta } = useOnSubmit<IVentaUpdateProps>({
        mutateAsync: mutatorUpdate.mutateAsync,
        onSuccess: async (data: IVenta) => handleSuccessVenta(data),
    });

    const handleFinalize = useCallback(() => {
        onSubmitFinalizarVenta({}, {});
    }, [onSubmitFinalizarVenta]);

    const handleSuccessVenta = useCallback(
        (updated: IVenta) => {
            setVenta(updated);
            closeModal();
            AlertSwal({
                type: AlertTypeEnum.Success,
                options: { timer: 2000, timerProgressBar: true },
            });
            refetchProducto();
        },
        [closeModal, refetchProducto, setVenta],
    );

    const { onSubmit: onSubmitDelete } = useOnSubmit({
        mutateAsync: mutatorDeleteProducto.mutateAsync,
        onSuccess: async () => {
            triggerReload();
            setSelectedId(0);
        },
    });
    const handleDelete = useCallback(() => {
        onSubmitDelete(null, {});
    }, [onSubmitDelete]);

    // Configuración de DataTable con renderers memoizados
    const renderersMap = useMemo(
        () => ({
            rowExpansion: {
                content: ({ record }: { record: IVentaProducto }) =>
                    !ventaFinalizada && <ActualizaProductoVenta record={record} refetchDatatable={triggerReload} />,
            },
            actions: ({ id }: IVentaProducto) =>
                !ventaFinalizada ? (
                    <Button
                        variant="error"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(id);
                            handleDelete();
                        }}
                    >
                        <Trash />
                    </Button>
                ) : null,
        }),
        [ventaFinalizada, triggerReload, handleDelete],
    );
    //TODO: arreglar tipado de renderersMap
    const { dataTableProps, refetch: refetchProductoDetalle } = useDataTable({
        service: useServiceVentaProductoDetalle,
        payload: {
            serviceParamId: ventaId,
            filters: [],
        },
        renderersMap,
    });

    useEffect(() => {
        refetchProductoDetalle();
    }, [reloadFlag, refetchProductoDetalle]);

    const disabled = useMemo(() => (dataTableProps?.totalRecords ?? 0) === 0 || ventaFinalizada, [dataTableProps?.totalRecords, ventaFinalizada]);

    return { dataTableProps, refetch: refetchProductoDetalle, onSubmitFinalizarVenta: handleFinalize, disabled };
};
