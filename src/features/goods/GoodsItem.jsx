import React from "react";
import { Link } from "react-router-dom";

const GoodsItem = ({ singleGoods }) => {
    const singleGoodsKeys = Object.keys(singleGoods).filter(
        (key) => key !== "price" && key !== "id" && key !== "mainCamera_Features"
    );
    return (
        <div className="goods-single-card">
            <h4>{singleGoods.brand + " " + singleGoods.model}</h4>
            {singleGoodsKeys.map((key, index) => (
                <p key={index}>
                    {key}: {singleGoods[key]}
                </p>
            ))}
            <ul>
                {singleGoods.mainCamera_Features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <p>Price: {singleGoods.price}$</p>
            <Link style={{ color: "purple", fontWeight: 700 }} to={`/goods/single-goods/${singleGoods.id}`}>
                View Details
            </Link>
        </div>
    );
};

export default GoodsItem;
