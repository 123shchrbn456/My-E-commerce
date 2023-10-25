import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectAllCartItems, deleteFromCart } from "./cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectAllCartItems);

    const onDeleteClick = (id) => {
        dispatch(deleteFromCart(id));
    };

    let content;

    if (!cart.length) {
        content = <div>No cart items found</div>;
    } else {
        // Переделать внизу
        content = cart.map((cartItem, index) => (
            <div key={index}>
                <p>
                    {cartItem.name} {cartItem.storage} {cartItem.color} {cartItem.price}$
                </p>
                <button onClick={() => onDeleteClick(cartItem.id)}>Delete</button>
            </div>
        ));
    }
    return (
        <div>
            <h3>Cart</h3>
            {content}
        </div>
    );
};

export default Cart;
