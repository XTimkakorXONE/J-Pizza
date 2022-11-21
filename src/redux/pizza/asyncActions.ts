import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams, TPizza } from "./type";

export const fetchPizzas = createAsyncThunk<TPizza[], SearchPizzaParams>(
  "pizza/fetchPizzaStatus",
  async ({ order, sortBy, category, search }) => {
    const { data } = await axios.get(
      `https://635f8fa9ca0fe3c21a9ed29c.mockapi.io/items?limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
