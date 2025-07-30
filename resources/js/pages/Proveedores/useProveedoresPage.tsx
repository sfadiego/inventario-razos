import { IFilters } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProveedor } from '@/models/proveedor.interface';
import { useServiceIndexProveedor, useServiceShowProveedor } from '@/Services/proveedor/useServiceProveedor';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProveedorStore } from './partials/useProveedorStore';

export interface IFiltroProveedor {
    nombre: string;
    empresa?: string;
    observaciones?: string;
}
export const useProveedoresPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const [selected, setSelected] = useState(0);
    const { isLoading, data } = useServiceShowProveedor(selected);
    const { setSelectedProveedor, refreshProveedorFlag } = useProveedorStore();
    const handleCloseModal = () => {
        closeModal();
        setSelected(0);
        setSelectedProveedor(null);
    };

    const handleOpenModal = () => {
        openModal();
        setSelected(0);
        setSelectedProveedor(null);
    };

    useEffect(() => {
        if (!isLoading && data && selected) {
            setSelectedProveedor(data);
        }
    }, [isLoading, data, selected, setSelectedProveedor]);

    const renderersMap = {
        actions: ({ id }: IProveedor) => (
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
    const filters: IFilters[] = [
        {
            property: 'nombre',
            operator: 'like',
            initialValue: '',
        },
    ];
    const initialValues: IFiltroProveedor = {
        nombre: '',
        empresa: '',
        observaciones: '',
    };

    return {
        useServiceIndexProveedor,
        refreshProveedorFlag,
        initialValues,
        renderersMap,
        filters,
        isOpen,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
    };
};
