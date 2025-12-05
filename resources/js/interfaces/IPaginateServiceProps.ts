export interface IFilterProps {
  property: string;
  value: string | number;
  operator?: string;
}

type orderBy = 'desc' | 'asc';
export interface IPaginateServiceProps {
  filters?: Array<IFilterProps> | null;
  search?: string | null;
  nameQuery?: string | null;
  page?: number;
  limit?: number;
  order?: orderBy;
  serviceParamId?: number | null;
}
