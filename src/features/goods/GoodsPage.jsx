import React, { useMemo } from "react";
import GoodsItem from "./GoodsItem";
import { useLocation, useParams } from "react-router-dom";
import { useGetGoodsQuery } from "./goodsSlice";
import FilterGoods from "../filter/FilterGoods";
import GoodsList from "./GoodsList";

const GoodsPage = () => {
    const urlParams = useParams();
    const location = useLocation();
    console.log(location);

    const { data = [], isLoading, isSuccess, isError } = useGetGoodsQuery(location.search ?? "");

    // console.log(data);

    let content;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        // Переделать внизу
        content = data.map((singleGoods) => <GoodsItem key={singleGoods.id} singleGoods={singleGoods} />);
    } else if (isError) {
        content = <div>Error!!!{error.toString()}</div>;
    }

    // return <div className="goods-container">{content}</div>;
    return (
        <div className="page-goods">
            <FilterGoods />
            <GoodsList content={content} />
        </div>
    );
};

export default GoodsPage;
