import { Field, InputType } from '@nestjs/graphql';
import { DefaultFilterPaginationInput } from './default.filter.pagination.input';
import { DefaultFilterSortInput } from './default.filter.sort.input';
import {FilterPaginationLengthEnum} from "../../filter/pagination.filter";
import {FilterSortByEnum} from "../../filter/sort.filter";

@InputType()
export class DefaultFilterInput {
  @Field({ nullable: true })
  search: string;

  @Field(() => DefaultFilterPaginationInput, {
    nullable: true,
    defaultValue: { page: 0, length: FilterPaginationLengthEnum.TEN },
  })
  pagination: DefaultFilterPaginationInput;

  @Field(() => DefaultFilterSortInput, {
    nullable: true,
    defaultValue: { field: 'id', by: FilterSortByEnum.DESC, nullsFirst: false },
  })
  sort: DefaultFilterSortInput;
}