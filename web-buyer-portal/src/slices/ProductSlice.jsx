// productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const myArray = new Array(9);

const initialProductState = myArray.map(() => {
  return {
    product: {},
    quantity: 0,
  };
});

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProductData: (state, action) => {
      return action.payload;
    },
    updateProductQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      state[index].quantity = quantity;
    },
  },
});

export const { setProductData, updateProductQuantity } = productSlice.actions;

export default productSlice.reducer;
