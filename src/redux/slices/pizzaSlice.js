import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async ({ order, sortBy, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading & success & error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
