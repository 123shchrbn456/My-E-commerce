import React from "react";
import { useSelector } from "react-redux";
import { selectAllCartItems } from "./cartSlice";
import CartItem from "./CartItem";

const Cart = () => {
    const cart = useSelector(selectAllCartItems);

    let content;

    if (!cart.length) {
        content = <div>No cart items found</div>;
    } else {
        content = cart.map((cartItem, index) => <CartItem key={index} cartItem={cartItem} />);
    }
    return (
        <div>
            <h3>Cart</h3>
            {content}
            <button>Submit cart</button>
            <button>Clear cart</button>
        </div>
    );
};

export default Cart;
