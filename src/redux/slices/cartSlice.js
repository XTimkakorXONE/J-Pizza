import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);
      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem.count > 1) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      } else {
        delete state.items[findItem];
      }
    },
    removeItem(state, action) {
      const filterItems = state.items.filter(
        (obj) => obj.id !== action.payload.id
      );
      state.items = filterItems;
      state.totalPrice = state.items.price;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectorItemsById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
