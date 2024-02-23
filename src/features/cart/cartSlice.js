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
                // Increase item quantity
                state.cartItems[existingItemIndex] = {
                    ...state.cartItems[existingItemIndex],
                    quantity: state.cartItems[existingItemIndex].quantity + 1,
                };
            } else {
                // Add new item
                let newItem = { ...action.payload, quantity: 1 };
                state.cartItems.push(newItem);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseAmountInCart: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (state.cartItems[itemIndex].quantity > 1) {
                // Decrease quantity
                state.cartItems[itemIndex].quantity -= 1;
            } else if (state.cartItems[itemIndex].quantity === 1) {
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
        getTotalPriceAndQuantity(state, action) {
            let totalPriceAndQuantity = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.quantity += quantity;

                    return cartTotal;
                },
                { totalPrice: 0, quantity: 0 }
            );
            totalPriceAndQuantity.totalPrice = parseFloat(totalPriceAndQuantity.totalPrice.toFixed(2));
            state.cartTotalQuantity = totalPriceAndQuantity.quantity;
            state.cartTotalAmount = totalPriceAndQuantity.totalPrice;
        },
    },
});

export const selectAllCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export const { addToCart, clearCartItems, decreaseAmountInCart, deleteFromCart, getTotalPriceAndQuantity } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
