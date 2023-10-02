// totalPageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const totalPageSlice = createSlice({
  name: "totalPage",
  initialState: {
    totalProducts: 1,
    currentPage: 1,
    productsPerPage: 10,
  },
  reducers: {
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
    },
  },
});

export const { setTotalProducts, setCurrentPage, setProductsPerPage } =
  totalPageSlice.actions;

export default totalPageSlice.reducer;
