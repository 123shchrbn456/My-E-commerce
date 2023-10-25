import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(state);
            state.push(action.payload);
        },
        deleteFromCart: (state, action) => {
            const { id } = action.payload;
            // Using this deleting method because our state is just an Array(not a nested Object)
            state.splice(
                state.findIndex((cartItem) => cartItem.id === id),
                1
            );
            // Or this way, in ordet to mutate state
            // return state.filter((cartItem) => cartItem.id !== id);
        },
        clearCart: (state, action) => {
            state = [];
        },
    },
});

export const selectAllCartItems = (state) => state.cart;

export const { addToCart, clearCart, deleteFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
