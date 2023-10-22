import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            [...state, action.payload];
        },
        clearCart: (state, action) => {
            state = [];
        },
    },
});

export const { addToCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
