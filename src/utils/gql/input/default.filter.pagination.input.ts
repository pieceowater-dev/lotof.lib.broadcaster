import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {FilterPaginationLengthEnum} from "../../filter/pagination.filter";


registerEnumType(FilterPaginationLengthEnum, {
  name: 'FilterPaginationLengthEnum',
});

@InputType()
export class DefaultFilterPaginationInput {
  @Field({ nullable: true, defaultValue: 0 })
  page: number;

  @Field(() => FilterPaginationLengthEnum, {
    nullable: true,
    defaultValue: FilterPaginationLengthEnum.TEN,
  })
  length: FilterPaginationLengthEnum;
}
