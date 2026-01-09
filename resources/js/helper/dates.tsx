import { format } from 'date-fns';
import { es } from 'date-fns/locale';

type DateFormats = {
  short: string;
  letters: string;
  dateTime: string;
};

type DateSeparator = '/' | '-' | ' ';

const dateFormats: DateFormats = {
  short: 'yyyy-MM-dd',
  letters: 'yyyy-MMMM-dd',
  dateTime: 'yyyy-MM-dd HH:mm:ss',
};

const dateSeparator = (format: string, separator: DateSeparator): string => {
  return format.replace(/-/g, separator);
};

export const formatDate = (date: string, formatType: keyof DateFormats = 'short', separatorType: DateSeparator = '-'): string => {
  if (!date) {
    return '';
  }

  return format(new Date(date), dateSeparator(dateFormats[formatType], separatorType), { locale: es });
};
