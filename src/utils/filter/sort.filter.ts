export class Sort<T> {
  by?: 'ASC' | 'DESC' = 'ASC';
  field?: keyof T;
}