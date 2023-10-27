import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseAmountInCart, deleteFromCart } from "./cartSlice";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const onIncreaseAmountClick = () => {
        dispatch(addToCart(cartItem));
    };

    const onDecreaseAmountClick = () => {
        dispatch(decreaseAmountInCart(cartItem));
    };

    const onDeleteItemClick = () => {
        dispatch(deleteFromCart(cartItem));
    };

    return (
        <div className="cart-item">
            <p>
                {cartItem.name} {cartItem.storage} {cartItem.color} {cartItem.price}$
            </p>
            <button onClick={onIncreaseAmountClick}>+</button>
            <span>{cartItem.amount}</span>
            <button onClick={onDecreaseAmountClick}>-</button>
            <button onClick={onDeleteItemClick}>Delete</button>
        </div>
    );
};

export default CartItem;
