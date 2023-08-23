import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import ProductReducer from "./ProductSlice";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    product: ProductReducer,
  },
});
export default Store;
