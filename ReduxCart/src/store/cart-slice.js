import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const cartSlice = createSlice({  // Assign the createSlice to cartSlice
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,  // You might want to track whether the cart has changed
  },

  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
       
      state.totalQuantity++; // increment total quantity globally
    
      if (!existingItem) {
        state.items.push({
          id: newItem.id,           // ✅ correct field
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,      // name or title — consistent with UI
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity--;  // Decrement the total quantity
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id); // Remove item
        } else {
          existingItem.quantity--;  // Decrement item quantity
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      }
    },
  },
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;  // Export the reducer, not the slice
