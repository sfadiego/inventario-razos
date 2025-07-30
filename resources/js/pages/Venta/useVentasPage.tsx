import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IVenta, StatusVenta } from '@/models/venta.interface';
import { useServiceShowVenta } from '@/Services/ventas/useServiceVenta';
import { ArrowRight, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useVentasStore } from './partials/useVentasStore';

export interface IFiltroVenta {
    nombre_venta: string;
    folio: string;
    cliente_id: number;
    tipo_compra: string;
    status_venta: StatusVenta;
}
export const useVentasPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const [selected, setSelected] = useState(0);
    const { isLoading, data } = useServiceShowVenta(selected);
    const { refreshFlag, setVenta } = useVentasStore();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        closeModal();
        setSelected(0);
        setVenta(null);
    };

    const handleOpenModal = () => {
        openModal();
        setSelected(0);
        setVenta(null);
    };

    useEffect(() => {
        if (!isLoading && data && selected) {
            setVenta(data);
        }
    }, [isLoading, data, selected, setVenta]);

    const renderersMap = {
        actions: ({ id, status_venta }: IVenta) => (
            <>
                <Button
                    onClick={() => {
                        openModal();
                        setSelected(id!);
                    }}
                    variant="primary"
                    size="sm"
                >
                    <Eye />
                </Button>
                {status_venta == 'activa' && (
                    <Button className="ml-2" onClick={() => navigate(`/venta/${id}/productos`)} variant="outline" size="sm">
                        <ArrowRight />
                    </Button>
                )}
            </>
        ),
    };
    const filters: IFilters[] = [
        {
            property: 'nombre_venta',
            operator: 'like',
            initialValue: '',
        },
    ];
    const initialValues: IFiltroVenta = {
        nombre_venta: '',
        folio: '',
        cliente_id: 0,
        tipo_compra: '',
        status_venta: 'activa',
    };

    return {
        renderersMap,
        isOpen,
        filters,
        initialValues,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
        refreshFlag,
    };
};
