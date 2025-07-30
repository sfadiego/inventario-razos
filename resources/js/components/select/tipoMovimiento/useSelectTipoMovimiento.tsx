import { IOptions } from '@/components/form/select/interfaces/IOptions';
import { ITipoMovimiento } from '@/models/tipoMovimiento.interface';
import { useServiceIndexTipoMovimiento } from '@/Services/tipoMovimiento/useServiceTipoMovimiento';
import { FormikProps } from 'formik';

interface IUseSelectTipoMovimientoProps {
    exclude?: string[];
    formik: FormikProps<any>;
}

const defaultValues = [{ value: 0, label: 'seleccionar...' }];

const mapDataToOptions = (data: ITipoMovimiento[]): IOptions[] => {
    return data.map((item) => {
        return {
            value: item.id ?? 0,
            label: item.nombre,
        };
    });
};

const filterOptions = (options: IOptions[], exclude: string[]) =>
    exclude.length ? options.filter((option) => !exclude.includes(option.label)) : options;

export const useSelectTipoMovimiento = (props: IUseSelectTipoMovimientoProps) => {
    const { exclude = [], formik } = props;
    const { isLoading, data } = useServiceIndexTipoMovimiento({});
    const options = !isLoading && data?.data ? mapDataToOptions(data.data) : defaultValues;
    const finalOptions = filterOptions(options, exclude);
    const selectedValue = finalOptions.find((option) => option.value === formik.values.tipo_movimiento_id);

    return {
        options: finalOptions,
        selectedValue,
        formik,
    };
};
