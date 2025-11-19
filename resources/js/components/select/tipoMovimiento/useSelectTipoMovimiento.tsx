import { IOptions } from '@/components/form/select/interfaces/IOptions';

export const filterOptions = (options: IOptions[], exclude: string[]) =>
  exclude.length ? options.filter((option) => !exclude.includes(option.label)) : options;
