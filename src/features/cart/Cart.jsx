import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, decreaseAmountInCart, deleteFromCart } from "./cartSlice";

const Cart = ({ children }) => {
    return <div>{children}</div>;
};

const Header = ({ heading }) => {
    return <h3>{heading}</h3>;
};

const Body = ({ data, render }) => {
    if (!data?.length) return <div>No cart items found</div>;
    return <div>{data.map(render)}</div>;
};

const Item = ({ cartItem }) => {
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

const Footer = ({ children }) => {
    return <div>{children}</div>;
};

Cart.Header = Header;
Cart.Body = Body;
Cart.Item = Item;
Cart.Footer = Footer;

export default Cart;
