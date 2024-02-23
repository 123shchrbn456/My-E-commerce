import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addNewOrderToFirebase: builder.mutation({
            async queryFn(order) {
                try {
                    const newOrder = { ...order, timestamp: serverTimestamp() };
                    const docRef = await addDoc(collection(db, "orders"), newOrder);
                    // toast.success("Order is created");
                    return { data: docRef.id };
                } catch (err) {
                    console.log(err);
                }
            },
            invalidatesTags: [{ type: "PersonalOrders" }],
        }),
        getUserOrders: builder.query({
            async queryFn(userId) {
                try {
                    const ordersRef = collection(db, "orders");
                    // const q = query(ordersRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
                    const q = query(ordersRef, where("userRef", "==", userId), orderBy("timestamp", "asc"));
                    const querySnap = await getDocs(q);
                    let orders = [];
                    querySnap.forEach((doc) => {
                        orders.push({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp?.seconds });
                    });
                    return { data: orders };
                } catch (err) {
                    throw new Error(err);
                }
            },
            providesTags: [{ type: "PersonalOrders" }],
        }),
    }),
});

export const { useAddNewOrderToFirebaseMutation, useGetUserOrdersQuery } = cartApiSlice;

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
