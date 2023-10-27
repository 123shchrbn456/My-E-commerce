import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const existingCartItem = state.find((cartItem) => cartItem.id === id);
            if (existingCartItem) {
                // Increase amount
                existingCartItem.amount++;
                const items = state.filter((item) => item.id !== id);
                state = [...items, existingCartItem];
            } else {
                // Add new item
                action.payload.amount = 1;
                state.push(action.payload);
            }
        },
        decreaseAmountInCart: (state, action) => {
            const { id } = action.payload;
            const existingCartItem = state.find((cartItem) => cartItem.id === id);
            if (existingCartItem && existingCartItem.amount === 1) {
                // Complete deleting
                // Using this deleting method because our state is just an Array(not a nested Object)
                state.splice(
                    state.findIndex((cartItem) => cartItem.id === id),
                    1
                );
                // Or this way, in ordet to mutate state return state.filter((cartItem) => cartItem.id !== id);
            } else {
                // Decrease amount
                const { id } = action.payload;
                existingCartItem.amount--;
                const items = state.filter((item) => item.id !== id);
                state = [...items, existingCartItem];
            }
        },
        deleteFromCart: (state, action) => {
            const { id } = action.payload;
            state.splice(
                state.findIndex((cartItem) => cartItem.id === id),
                1
            );
        },
        clearCart: (state, action) => {
            state = [];
        },
    },
});

export const selectAllCartItems = (state) => state.cart;

export const { addToCart, clearCart, decreaseAmountInCart, deleteFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
