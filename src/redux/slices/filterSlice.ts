import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sortType: TSort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  sortType: {
    name: "популярности (от популярных)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<TSort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export const selectSortType = (state: RootState) => state.filter.sortType;
export default filterSlice.reducer;
