import React from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addToCart, clearCartItems, decreaseAmountInCart, deleteFromCart, useAddNewOrderToFirebaseMutation } from "./cartSlice";
import Button from "../../ui/Button";

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
            <span>{cartItem.quantity}</span>
            <button onClick={onDecreaseAmountClick}>-</button>
            <button onClick={onDeleteItemClick}>Delete</button>
        </div>
    );
};

const Footer = ({ cartItems, cartTotalQuantity, cartTotalAmount }) => {
    const auth = getAuth();
    const [addNewOrder, { isLoading, isError }] = useAddNewOrderToFirebaseMutation();

    const onSubmitCartClick = async () => {
        const orderData = {
            cartItems,
            cartTotalQuantity,
            cartTotalAmount,
            userRef: auth.currentUser.uid,
        };
        await addNewOrder(orderData);
        console.log(isError);
    };

    const onClearCartClick = () => {
        dispatch(clearCartItems());
    };

    return (
        <div>
            <span>Total quantity: {cartTotalQuantity}</span>
            <span>Total price: {cartTotalAmount}</span>
            <Button onClick={onSubmitCartClick}>Submit cart</Button>
            <Button type="danger" onClick={onClearCartClick}>
                Clear cart
            </Button>
        </div>
    );
};

Cart.Header = Header;
Cart.Body = Body;
Cart.Item = Item;
Cart.Footer = Footer;

export default Cart;
