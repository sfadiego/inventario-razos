import { IFilterItem } from '@/components/form/select/interfaces/IFilter';
import * as Yup from 'yup';
interface IFiltroProducto {
    nombre?: string;
    proveedor_id?: number;
    categoria_id?: number;
}
interface IuseFiltrosProductosProps {
    onFilter: (filters: IFilterItem[]) => void;
    closeModal: () => void;
}
export const useFiltrosProductos = (props: IuseFiltrosProductosProps) => {
    const { onFilter, closeModal } = props;
    const initialValues: IFiltroProducto = {
        proveedor_id: 0,
        categoria_id: 0,
    };
    const validationSchema = Yup.object().shape({
        proveedor_id: Yup.number().min(0, 'Seleccione un proveedor').optional(),
        categoria_id: Yup.number().min(0, 'Seleccione una categoría').optional(),
    });
    const onSubmit = async (values: any) => {
        //TODO: crear un hook en carpeta de form para manejar los filtros
        const filters = Object.keys(values).map((key) => {
            const item: IFilterItem = {
                property: key,
                operator: 'like',
                value: values[key] || '',
            };
            return item;
        });

        onFilter(filters);
        closeModal();
    };

    return { initialValues, validationSchema, onSubmit };
};
