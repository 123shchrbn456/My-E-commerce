import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const GoodsItem = ({ singleGoods }) => {
    console.log(singleGoods);
    const dispatch = useDispatch();
    const singleGoodsFeatures = Object.keys(singleGoods).filter(
        (key) => key !== "price" && key !== "id" && key !== "mainCamera_Features"
    );

    const onBuyClick = () => {
        const { id, model: name, storage, color, price } = singleGoods;
        // send to the cart
        dispatch(addToCart({ name, id, storage, color, price }));
    };

    return (
        <div className="goods-single-card">
            <h4>{singleGoods.brand + " " + singleGoods.model + " " + singleGoods.storage + " " + singleGoods.color}</h4>
            {singleGoodsFeatures.map((feature, index) => (
                <p key={index}>
                    {feature}: {singleGoods[feature]}
                </p>
            ))}
            <ul>
                {singleGoods.mainCamera_Features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <p>Price: {singleGoods.price}$</p>
            <button onClick={onBuyClick}>Buy</button>
            <br />
            <Link style={{ color: "purple", fontWeight: 700 }} to={`/goods/single-goods/${singleGoods.id}`}>
                View Details
            </Link>
        </div>
    );
};

export default GoodsItem;
