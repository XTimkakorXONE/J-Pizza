export type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: number;
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: TPizza[];
  status: Status;
}
