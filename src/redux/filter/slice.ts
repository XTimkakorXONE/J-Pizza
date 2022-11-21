import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum, TSort } from "./type";

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  sortType: {
    name: "популярности (от популярных)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
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

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.categoryId = 0;
        state.sortType = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const { setCategoryId, setSortType, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
