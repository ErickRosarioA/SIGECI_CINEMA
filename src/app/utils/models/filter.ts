export interface IFilterModel{
    page: number;
    quantityToList: number;
}
export interface ISearcherOptions{
    name: string;
    attribute: string;
    isDate: boolean;
    isMoney: boolean;
    isDropDown: boolean;
    nestedDropdown: INestedDropDown[];
}

export interface INestedDropDown{
    name: string;
    value: string;
}