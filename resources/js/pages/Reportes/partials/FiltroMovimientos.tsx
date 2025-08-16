import DatePicker from '@/components/form/datepicker/InputDatePicker';
import { SelectProducto } from '@/components/select/productos/SelectProducto';
import { SelectTipoMovimiento } from '@/components/select/tipoMovimiento/SelectTipoMovimiento';
import { FormikProps } from 'formik';
import { IFiltroReporteMovimiento } from '../useReportesPage';

interface IFiltrosProductoProps {
    formik: FormikProps<IFiltroReporteMovimiento>;
}

export const FiltroMovimientos = ({ formik }: IFiltrosProductoProps) => {
    return (
        <>
            <div className="col-span-12 mt-4">
                <DatePicker name="created_at" formik={formik} label="Fecha de movimiento" />
            </div>
            <div className="col-span-12">
                <SelectTipoMovimiento formik={formik}></SelectTipoMovimiento>
            </div>
            <div className="col-span-12 mb-4">
                <SelectProducto formik={formik}></SelectProducto>
            </div>
        </>
    );
};
