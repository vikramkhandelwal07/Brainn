import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    addToCart: (state, action) => {
      const item = action.payload; // expects { productId, name, price, quantity }
      const existingItem = state.cartItems.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
        toast.success("Increased item quantity in cart");
      } else {
        state.cartItems.push(item);
        toast.success("Item added to cart");
      }

      state.totalItems += item.quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const itemToRemove = state.cartItems.find(
        (i) => i.productId === productId
      );

      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (i) => i.productId !== productId
        );
        toast.success("Item removed from cart");
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      }
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalItems");
      toast.success("Cart has been reset");
    },
  },
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
