import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalAmount: 0,
  totalQuantity: 0,
};


const calculateTotals = (cartItems) => {
  const totalAmount = cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return { totalAmount, totalQuantity };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    ...calculateTotals(initialState.cartItems),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += Number(newItem.price);
      }

      const totals = calculateTotals(state.cartItems);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter(item => item.id !== id);

        const totals = calculateTotals(state.cartItems);
        state.totalAmount = totals.totalAmount;
        state.totalQuantity = totals.totalQuantity;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
