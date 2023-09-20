import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "CART",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.product?.productId !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, actionType } = action.payload;

      return state.map((item) => {
        if (item.product?.productId === id) {
          if (actionType === "increment") {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else if (actionType === "decrement" && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        }
        return item;
      });
    },
  },
});
export const { add, remove, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
