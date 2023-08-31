import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice";
import buyerReducer from "../slices/buyerSlice";
import counterReducer from "../slices/counterSlice";
import productReducer from '../slices/ProductSlice'

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    buyer : buyerReducer,
    counter : counterReducer,
    product : productReducer
  },
});
export default Store;
