import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const STATUS = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const ProductSlice = createSlice({
  name: "PRODUCT",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    // add(state, action) {
    //   state.push(action.payload);
    // },
    // remove(state, action) {
    //   return state.filter((item) => item.id !== action.payload);
    // },
  },
});
// export const { add, remove } = ProductSlice.actions;
export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;

// export function fetchProduct() {
//   return function fetchProductThunk(dispatch, getState) {
//     axios.get("https://fakestoreapi.com/products").then((resp) => {
//       console.log(resp.data);
//       dispatch(setProducts(resp.data));
//     });
//   };
// }
// Thunks
export const fetchProduct = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});
