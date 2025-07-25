import { useOnSubmit } from '@/hooks/useOnSubmit';
import { IReporteMovimiento } from '@/models/reporteMovimiento.interface';
import { useServiceStoreReporteMovimiento } from '@/Services/reporteMovimiento/useServiceReporteMovimientos';
import * as Yup from 'yup';
interface IuseFormReportProps {
    closeModal?: () => void;
}

export const useFormReport = (props: IuseFormReportProps) => {
    const { closeModal } = props;
    const initialValues: IReporteMovimiento = {
        id: 0,
        producto_id: 0,
        tipo_movimiento_id: 0,
        motivo: '',
        cantidad: 0,
        cantidad_anterior: 0,
        cantidad_actual: 0,
        user_id: 0,
        fecha_movimiento: '',
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        proveedor_id: Yup.number().min(1, 'Seleccione un proveedor').required('El proveedor es obligatorio'),
        categoria_id: Yup.number().min(1, 'Seleccione una categoría').required('La categoría es obligatoria'),
        codigo: Yup.string(),
        precio_compra: Yup.number().min(1, 'Debe ser mayor o igual a $1').required('El precio de compra es obligatorio'),
        precio_venta: Yup.number().min(1, 'Debe ser mayor o igual a $1').required('El precio de venta es obligatorio'),
        stock: Yup.number().min(0, 'Debe ser mayor o igual a 1').required('El stock es obligatorio'),
        cantidad_minima: Yup.number().min(1, 'Debe ser mayor o igual a 1').required('La cantidad mínima es obligatoria'),
        compatibilidad: Yup.string(),
        ubicacion_id: Yup.number().min(1, 'Seleccione una ubicación').required('La ubicación es obligatoria'),
        activo: Yup.boolean(),
    });

    const handleSuccess = (data: IReporteMovimiento) => {
        return console.log(data);
        // const { codigo } = data;
        if (closeModal) {
            closeModal();
        }

        // setRefreshFlag();
        // AlertSwal({
        //     type: AlertTypeEnum.Success,
        //     title: `Exito`,
        //     text: `Elemento guardado correctamente : ${codigo} `,
        // });
    };

    const mutator = useServiceStoreReporteMovimiento();
    const { onSubmit } = useOnSubmit<IReporteMovimiento>({
        mutateAsync: mutator.mutateAsync,
        onSuccess: async (data) => handleSuccess(data),
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
