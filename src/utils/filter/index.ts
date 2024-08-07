import {Sort} from "./sort.filter";
import {Paginated} from "./pagination.filter";

export class DefaultFilter<T> {
  search?: string;
  sort?: Sort<T>;
  pagination?: Paginated;
}