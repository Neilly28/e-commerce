import { createSlice } from "@reduxjs/toolkit";

// create slice
const cartSlice = createSlice({
  // create name
  name: "cart",

  // create initial state
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  // create reducers
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
