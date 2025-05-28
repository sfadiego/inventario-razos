export type operators = '=' | '>' | '<' | '>=' | '<=' | '!=' | 'like';

export interface IFilterItem {
    property: string;
    value: string | number | boolean;
    operator?: operators;
}
