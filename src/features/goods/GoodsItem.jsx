import React from "react";

const GoodsItem = ({ singleGoods }) => {
    return (
        <div className="goods-single-card">
            <h4>{singleGoods.brand + " " + singleGoods.model}</h4>
            <p>Сolor: {singleGoods.color} </p>
            <p>Series: {singleGoods.series} </p>
            <p>Screen Refresh Rate: {singleGoods.screenRefreshRate}</p>
            <p>Storage: {singleGoods.storage}</p>
            <p>Main Camera: {singleGoods.mainCamera_Pixels}</p>
            <ul>
                {singleGoods.mainCamera_Features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <p>Price: {singleGoods.price}$</p>
        </div>
    );
};

export default GoodsItem;
