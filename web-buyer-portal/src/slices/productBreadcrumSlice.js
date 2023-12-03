import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  quantity: 0,
};

const productBreadcrumSlice = createSlice({
  name: "productBreadcrum",
  initialState,
  reducers: {
    setProductBreadcrumData: (state, action) => action.payload,
    updateProductQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      state[index].quantity = quantity;
    },
  },
});

export const { setProductBreadcrumData, updateProductQuantity } =
  productBreadcrumSlice.actions;

export default productBreadcrumSlice.reducer;
