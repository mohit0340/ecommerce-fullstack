import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import UserSlice from "./UserSlice";
import Cart from "./Cart";

const Store = configureStore({
  reducer: {
    user: UserSlice,
    cart: Cart,
  },
});

export default Store;
