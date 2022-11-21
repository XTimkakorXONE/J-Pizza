import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { PizzaSliceState, SearchPizzaParams, Status, TPizza } from "./type";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading & success & error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<TPizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
