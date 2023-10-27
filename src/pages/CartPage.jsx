import React from "react";
import { useSelector } from "react-redux";
import { selectAllCartItems } from "../features/cart/cartSlice";
import CartItem from "../features/cart/CartItem";
import PageWrapper from "../ui/PageWrapper";

const Cart = () => {
    const cart = useSelector(selectAllCartItems);

    let content;

    if (!cart.length) {
        content = <div>No cart items found</div>;
    } else {
        content = cart.map((cartItem, index) => <CartItem key={index} cartItem={cartItem} />);
    }
    return (
        <PageWrapper page="cart">
            <h3>Cart</h3>
            {content}
            <button>Submit cart</button>
            <button>Clear cart</button>
        </PageWrapper>
    );
};

export default Cart;
