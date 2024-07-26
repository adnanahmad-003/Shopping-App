import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      if (!state.some(item => item.id === newItem.id)) {
        state.push(newItem);
      }
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;