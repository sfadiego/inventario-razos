import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IInitialValuesReporteMovimiento, IReporteMovimiento } from '@/models/reporteMovimiento.interface';
import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import { useState } from 'react';

export interface IFiltroReporteMovimiento {
    producto_id?: string;
    tipo_movimiento_id?: string;
    user_id?: string;
    fecha_movimiento?: string;
}

const filters: IFilterItem[] = [
    {
        property: 'producto_id',
        operator: 'like',
        value: '',
    },
];
const initialValues: IInitialValuesReporteMovimiento = {
    producto_id: 0,
    tipo_movimiento_id: 0,
    motivo: '',
    cantidad: 0,
    cantidad_anterior: 0,
    cantidad_actual: 0,
    user_id: 0,
    fecha_movimiento: format(new Date(), 'yyyy-MM-dd'),
};
// console.log(initialValues);

export const useReportesPage = () => {
    const { openModal, isOpen, closeModal } = useModal();
    const [selected, setSelected] = useState(0);
    // const { isLoading, data } = useServiceShowReporteMovimiento(selected);
    // const { setSelectedUbicacion, refreshUbicacionFlag } = useUbicacionStore();
    const handleCloseModal = () => {
        closeModal();
        setSelected(0);
        // setSelectedUbicacion(null);
    };

    const handleOpenModal = () => {
        openModal();
        setSelected(0);
        // setSelectedUbicacion(null);
    };

    // useEffect(() => {
    //     if (!isLoading && data && selected) {
    //         setSelectedUbicacion(data);
    //     }
    // }, [isLoading, data, selected, setSelectedUbicacion]);

    const renderersMap = {
        actions: ({ id }: IReporteMovimiento) => (
            <Button
                onClick={() => {
                    openModal();
                    setSelected(id!);
                }}
                variant="primary"
                size="sm"
            >
                <Edit />
            </Button>
        ),
    };

    return {
        openModal: handleOpenModal,
        isOpen,
        filters,
        // refreshUbicacionFlag,
        closeModal: handleCloseModal,
        // useServiceIndexUbicaciones,
        renderersMap,
        initialValues,
    };
};
