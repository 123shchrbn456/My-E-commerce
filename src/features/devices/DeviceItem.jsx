import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const DeviceItem = ({ singleDevice }) => {
    const dispatch = useDispatch();
    const singleDeviceFeatures = Object.keys(singleDevice).filter(
        (key) => key !== "price" && key !== "id" && key !== "mainCamera_Features"
    );

    const onBuyClick = () => {
        const { id, model: name, storage, color, price } = singleDevice;
        // send to the cart
        dispatch(addToCart({ name, id, storage, color, price }));
    };

    return (
        <div className="goods-single-card">
            <h4>
                {singleDevice.brand + " " + singleDevice.model + " " + singleDevice.storage + " " + singleDevice.color}
            </h4>
            {singleDeviceFeatures.map((feature, index) => (
                <p key={index}>
                    {feature}: {singleDevice[feature]}
                </p>
            ))}
            <ul>
                {singleDevice.mainCamera_Features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <p>Price: {singleDevice.price}$</p>
            <button onClick={onBuyClick}>Buy</button>
            <br />
            <Link style={{ color: "purple", fontWeight: 700 }} to={`/goods/single-goods/${singleDevice.id}`}>
                View Details
            </Link>
        </div>
    );
};

export default DeviceItem;
