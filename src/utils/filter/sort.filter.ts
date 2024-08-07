export enum FilterSortByEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class Sort<T> {
  by?: FilterSortByEnum = 'DESC';
  field?: keyof T;
}