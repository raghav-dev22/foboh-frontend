import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice";
import buyerReducer from "../slices/buyerSlice";
import counterReducer from "../slices/counterSlice";
import productReducer from "../slices/ProductSlice";
import DeliveryEditReducer from "../slices/DeliveryEditSlice";
import organisationReducer from "../slices/organisationSlice";
import totalPageReducer from '../slices/totalPageSlice'

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    editDelivery: DeliveryEditReducer,
    buyer: buyerReducer,
    counter: counterReducer,
    product: productReducer,
    organisation: organisationReducer,
    totalPage : totalPageReducer,
  },
});
export default Store;
