import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, getTotalPriceAndQuantity, selectAllCartItems, selectCartTotalAmount, selectCartTotalQuantity } from "./cartSlice";
import { useSendCartItemsMutation } from "../../utils/helpers";
import Cart from "./Cart";

const CartDevices = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectAllCartItems);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const cartTotalAmount = useSelector(selectCartTotalAmount);

    useEffect(() => {
        dispatch(getTotalPriceAndQuantity());
    }, [cartItems]);

    return (
        <>
            <Cart>
                <Cart.Header heading="Cart" />
                <Cart.Body data={cartItems} render={(cartItem) => <Cart.Item key={cartItem.id} cartItem={cartItem} />} />
                <Cart.Footer cartItems={cartItems} cartTotalQuantity={cartTotalQuantity} cartTotalAmount={cartTotalAmount} />
            </Cart>
        </>
    );
};

export default CartDevices;
