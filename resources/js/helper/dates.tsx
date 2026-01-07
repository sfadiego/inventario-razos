import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type DateFormats = {
  short: string;
  letters: string;
  long: string;
  dateTime: string;
};

type DateSeparator = '/' | '-' | ' ';

const dateFormats: DateFormats = {
  short: 'dd-MMM-yyyy',
  long: 'dd-MM-yyyy',
  letters: 'dd-MMMM-yyyy',
  dateTime: 'dd-MM-yyyy HH:mm:ss',
};

const dateSeparator = (format: string, separator: DateSeparator): string => {
  return format.replace(/-/g, separator);
};

export const formatDate = (date: string, formatType: keyof DateFormats = 'long', separatorType: DateSeparator = '-'): string => {
  if (!date) {
    return '';
  }

  return format(new Date(date), dateSeparator(dateFormats[formatType], separatorType), { locale: es });
};
