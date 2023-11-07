import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (existingItemIndex >= 0) {
                // Increase item amount
                state.cartItems[existingItemIndex] = {
                    ...state.cartItems[existingItemIndex],
                    amount: state.cartItems[existingItemIndex].amount + 1,
                };
            } else {
                // Add new item
                let newItem = { ...action.payload, amount: 1 };
                state.cartItems.push(newItem);
            }
        },
        decreaseAmountInCart: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (state.cartItems[itemIndex].amount > 1) {
                // Decrease amount
                state.cartItems[itemIndex].amount -= 1;
            } else if (state.cartItems[itemIndex].amount === 1) {
                // Complete deleting
                const newCartItems = state.cartItems.filter((item) => item.id !== id);
                state.cartItems = newCartItems;
            }
        },
        deleteFromCart: (state, action) => {
            const { id } = action.payload;
            const newCartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
            state.cartItems = newCartItems;
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
        },
    },
});

export const selectAllCartItems = (state) => state.cart.cartItems;

export const { addToCart, clearCartItems, decreaseAmountInCart, deleteFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
