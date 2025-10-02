import { format } from 'date-fns';
import { FormikProps } from 'formik';

// TODO: revisar si hay problema con fechas
const formatDate = (date: string): string => {
  if (!date) {
    return '';
  }
  return format(new Date(date), 'yyyy-MM-dd');
};

export const useDatePicker = () => {
  return {
    handleSetDate: (formik: FormikProps<any>, name: string, date: string | string[] | null, isRange = false) => {
      if (date === null) {
        formik.setFieldValue(name, null);
        if (isRange) {
          formik.setFieldValue(`${name}_end`, null);
        }
        return null;
      }

      if (isRange && Array.isArray(date) && date.length === 2) {
        // Para rango de fechas, establecemos valores iniciales y finales
        const startDate = formatDate(date[0]);
        const endDate = formatDate(date[1]);

        formik.setFieldValue(name, startDate);
        formik.setFieldValue(`${name}_end`, endDate);

        return [startDate, endDate];
      } else {
        // Comportamiento original para una sola fecha
        const newFormatDate = Array.isArray(date) ? date[0] : (date as string);
        formik.setFieldValue(name, formatDate(newFormatDate));
        return newFormatDate;
      }
    },
    formatDate,
    handleChange: (newDateInputValue: Array<any>, defaultDate: string | string[] | null) => {
      if (!newDateInputValue.length) {
        return null;
      }

      if (Array.isArray(defaultDate)) {
        // Para rango, podemos recibir dos fechas
        if (newDateInputValue.length >= 2) {
          return [newDateInputValue[0].toISOString(), newDateInputValue[1].toISOString()];
        } else {
          return [newDateInputValue[0].toISOString(), ''];
        }
      }

      return newDateInputValue.shift().toISOString();
    },
  };
};
