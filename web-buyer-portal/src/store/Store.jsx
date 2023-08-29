import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import ProductReducer from "./ProductSlice";
import buyerReducer from "../slices/buyerSlice";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    product: ProductReducer,
    buyer : buyerReducer
  },
});
export default Store;
