import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
  },
  reducers: {
    GetCartdetails: (state, action) => {
      const item = action.payload;
      state.cart = action.payload;
    },
    addtocart: async (state, action) => {
      const item = action.payload;

      try {
        let res = await axios.post(
          "https://ecommerce-fullstack-zfpe.onrender.com/api/product/cart/add",
          item,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(res);
        if (res.status == 200) {
          toast.success(res.data.message);
          console.log(res);
          return true;
        } else {
          console.log(res);
          return false;
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        console.log(err);
        return false;
      }
    },
    decreaseFromCart: (state, action) => {
      const product = action.payload.product;
      const index = state.findIndex((it) => it.product._id === product._id);

      if (index !== -1) {
        state[index].quantity -= 1; // Always decrease by one
        if (state[index].quantity <= 0) {
          state.splice(index, 1); // Remove the item if quantity is 0 or less
        }
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload._id;
      return state.filter((it) => it.product._id !== productId);
    },
  },
});

export const { addtocart, decreaseFromCart, removeFromCart, GetCartdetails } =
  CartSlice.actions;
export default CartSlice.reducer;
