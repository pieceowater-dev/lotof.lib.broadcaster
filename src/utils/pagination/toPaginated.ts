import {PaginatedEntity} from "./entity.pagination";

export const toPaginated = <Item>(data: any[]): PaginatedEntity<Item> => ({
  rows: data[0],
  info: {
    count: data[1],
  },
});