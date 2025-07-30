interface IFilterProps {
    property: string;
    value: string | number;
    operator?: string;
}

export interface IPaginateServiceProps {
    filters?: Array<IFilterProps> | null;
    search?: string | null;
    nameQuery?: string | null;
    page?: number;
    limit?: number;
    serviceParamId?: number | null;
}
