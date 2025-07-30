import { AlertSwal } from '@/components/alertSwal/AlertSwal';
import { AlertTypeEnum } from '@/enums/AlertTypeEnum';
import { TipoMovimientoEnum } from '@/enums/tipoMovimientoEnum';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IInitialValuesReporteMovimiento } from '@/models/reporteMovimiento.interface';
import { useServiceIndexReporteMovimiento, useServiceStoreReporteMovimiento } from '@/Services/reporteMovimiento/useServiceReporteMovimientos';
import * as Yup from 'yup';
interface IuseFormReportProps {
    closeModal?: () => void;
}

export const useFormReport = (props: IuseFormReportProps) => {
    const { closeModal } = props;
    const initialValues: IInitialValuesReporteMovimiento = {
        producto_id: 0,
        tipo_movimiento_id: 0,
        motivo: '',
        cantidad: 0,
    };

    const validationSchema = Yup.object().shape({
        producto_id: Yup.number().required('El producto es obligatorio').min(1, 'Selecciona un producto válido'),
        tipo_movimiento_id: Yup.number().required('El tipo de movimiento es obligatorio').min(1, 'Selecciona un tipo válido'),
        motivo: Yup.string().when('tipo_movimiento_id', {
            is: TipoMovimientoEnum.Ajuste,
            then: (schema) => schema.required('El motivo es obligatorio'),
            otherwise: (schema) => schema.optional(),
        }),
        cantidad: Yup.number()
            .required('La cantidad es obligatoria')
            .when('tipo_movimiento_id', {
                is: TipoMovimientoEnum.Entrada,
                then: (schema) => schema.min(1, 'La cantidad debe ser mayor que 0 para entradas'),
                otherwise: (schema) => schema.nonNullable(),
            }),
    });
    const { refetch } = useServiceIndexReporteMovimiento({});
    const handleSuccess = () => {
        if (closeModal) {
            closeModal();
        }

        AlertSwal({
            type: AlertTypeEnum.Success,
            title: `Exito`,
            text: `Movimiento guardado correctamente`,
        });
        refetch();
    };

    const mutator = useServiceStoreReporteMovimiento();
    const { onSubmit } = useOnSubmit<IInitialValuesReporteMovimiento>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async () => handleSuccess(),
    });

    const formikProps = {
        initialValues,
        validationSchema,
        onSubmit,
    };
    return {
        formikProps,
    };
};
