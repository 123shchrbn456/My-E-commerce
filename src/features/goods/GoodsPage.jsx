import React, { useMemo } from "react";
import GoodsItem from "./GoodsItem";
import { useLocation, useParams } from "react-router-dom";
import { useGetCategoryGoodsQuery, useGetGoodsQuery, useGetSearchGoodsQuery } from "./goodsSlice";
import { createSelector } from "@reduxjs/toolkit";
import FilterGoods from "../filter/FilterGoods";
import GoodsList from "./GoodsList";

const GoodsPage = () => {
    const urlParams = useParams();
    const location = useLocation();
    console.log(location);

    const { data, isLoading, isSuccess, isError } = useGetSearchGoodsQuery(location.search ?? "");

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
