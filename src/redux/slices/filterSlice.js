import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  searchValue: "",
  sortType: {
    name: "популярности (от популярных)",
    sortProperty: "rating",
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
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

export default filterSlice.reducer;
