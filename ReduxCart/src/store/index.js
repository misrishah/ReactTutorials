import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice"; // ✅ Rename this properly

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer, // ✅ This should be a reducer, not the whole slice
  },
});

export default store;
