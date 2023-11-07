import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, selectAllCartItems } from "./cartSlice";
import { useSendCartItemsMutation } from "../../utils/helpers";
import Cart from "./Cart";
import Button from "../../ui/Button";

const CartDevices = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectAllCartItems);

    const [sendCartItems] = useSendCartItemsMutation();

    const onSubmitCartClick = () => {
        sendCartItems(cartItems);
    };

    const onClearCartClick = () => {
        dispatch(clearCartItems());
    };

    return (
        <>
            <Cart>
                <Cart.Header heading="Cart" />
                <Cart.Body data={cartItems} render={(cartItem) => <Cart.Item key={cartItem.id} cartItem={cartItem} />} />
                <Cart.Footer>
                    <Button onClick={onSubmitCartClick}>Submit cart</Button>
                    <Button type="danger" onClick={onClearCartClick}>
                        Clear cart
                    </Button>
                </Cart.Footer>
            </Cart>
        </>
    );
};

export default CartDevices;
