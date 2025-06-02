import { IFilterItem } from '@/components/filters/modalFilter/types';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IProveedor } from '@/models/proveedor.interface';
import { useServiceIndexProveedor } from '@/Services/proveedor/useServiceProveedor';
import { Edit } from 'lucide-react';

export interface IFiltroProveedor {
    nombre: string;
    empresa?: string;
    observaciones?: string;
}
export const useProveedoresPage = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const renderersMap = {
        actions: ({ id }: IProveedor) => (
            <Button variant="primary" size="sm">
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
    const initialValues: IFiltroProveedor = {
        nombre: '',
        empresa: '',
        observaciones: '',
    };
    return { useServiceIndexProveedor, initialValues, renderersMap, filters, isOpen, openModal, closeModal };
};
