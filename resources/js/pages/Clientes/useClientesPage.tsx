import { IFilterItem } from '@/components/filters/modalFilter/types';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { ICliente } from '@/models/cliente.interface';
import { useServiceIndexClientes } from '@/Services/clientes/useServiceClientes';
import { Edit } from 'lucide-react';

export interface IFiltroCliente {
    nombre: string;
    confiable?: boolean;
    observaciones?: string;
}
export const useClientesPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const renderersMap = {
        confiable: ({ confiable }: ICliente) => <Badge variant="solid" color={`${!confiable ? 'error' : 'success'}`}>{`${!confiable ? 'No' : 'Si'}`}</Badge>,
        actions: ({ id }: ICliente) => (
            <Button variant='primary' size='sm'>
                <Edit />
            </Button>
        ),
    };
    const filters: IFilterItem[] = [
        {
            property: 'nombre',
            operator: 'like',
            value: '',
        },
    ];
    const initialValues: IFiltroCliente = {
        nombre: '',
        confiable: true,
        observaciones: '',
    };
    return { useServiceIndexClientes, initialValues, renderersMap, filters, isOpen, openModal, closeModal };
};
