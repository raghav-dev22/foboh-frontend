import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice";
import productReducer from "../slices/productaDataSlice";
import buyerReducer from "../slices/buyerSlice";
import counterReducer from "../slices/counterSlice";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    buyer : buyerReducer,
    counter : counterReducer
  },
});
export default Store;
