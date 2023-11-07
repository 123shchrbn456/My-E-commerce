import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
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
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        deleteFromCart: (state, action) => {
            const { id } = action.payload;
            const newCartItems = state.cartItems.filter((cartItem) => cartItem.id !== id);
            state.cartItems = newCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const selectAllCartItems = (state) => state.cart.cartItems;

export const { addToCart, clearCartItems, decreaseAmountInCart, deleteFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
