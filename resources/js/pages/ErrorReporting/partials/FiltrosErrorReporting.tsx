import DatePicker from '@/components/form/datepicker/InputDatePicker';
import { SelectStatusCode } from '@/components/select/statusCodeReporting/SelectStatusCode';
import { FormikProps } from 'formik';
import { IFiltroErrorReporting } from '../useErrorReporting';

interface IFiltrosErrorReportingProps {
  formik: FormikProps<IFiltroErrorReporting>;
}

export const FiltrosErrorReporting = ({ formik }: IFiltrosErrorReportingProps) => {
  return (
    <>
      <div className="col-span-12 lg:col-span-12">
        <SelectStatusCode formik={formik} />
      </div>
      <div className="col-span-12 lg:col-span-12">
        <DatePicker name="created_at" formik={formik} label="Fecha" />
      </div>
    </>
  );
};
