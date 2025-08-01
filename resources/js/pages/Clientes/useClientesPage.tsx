import { IFilters } from '@/components/filters/modalFilter/types';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { ICliente } from '@/models/cliente.interface';
import { useServiceIndexClientes, useServiceShowCliente } from '@/Services/clientes/useServiceClientes';
import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useClienteStore } from './partials/useClienteStore';

export interface IFiltroCliente {
    nombre: string;
    confiable?: boolean;
    observaciones?: string;
}
export const useClientesPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const [selected, setSelected] = useState(0);
    const { isLoading, data } = useServiceShowCliente(selected);
    const { setSelectedCliente } = useClienteStore();

    const handleCloseModal = () => {
        closeModal();
        setSelected(0);
        setSelectedCliente(null);
    };

    const handleOpenModal = () => {
        openModal();
        setSelected(0);
        setSelectedCliente(null);
    };

    useEffect(() => {
        if (!isLoading && data && selected) {
            setSelectedCliente(data);
        }
    }, [isLoading, data, selected, setSelectedCliente]);

    const renderersMap = {
        confiable: ({ confiable }: ICliente) => (
            <Badge variant="solid" color={`${!confiable ? 'error' : 'success'}`}>{`${!confiable ? 'No' : 'Si'}`}</Badge>
        ),
        actions: ({ id }: ICliente) => (
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
    const filters: IFilters<IFiltroCliente>[] = [
        {
            property: 'nombre',
            operator: 'like',
            initialValue: '',
        },
    ];

    return {
        useServiceIndexClientes,
        renderersMap,
        filters,
        isOpen,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
    };
};
