export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ACK = "-rating",
  TITLE_DESC = "title",
  TITLE_ACK = "-title",
  PRICE_DESC = "price",
  PRICE_ACK = "-price",
}

export type TSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  sortType: TSort;
}
