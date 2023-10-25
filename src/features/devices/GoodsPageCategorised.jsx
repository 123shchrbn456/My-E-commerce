import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryGoodsQuery } from "./goodsSlice";
import { createSelector } from "@reduxjs/toolkit";
import FilterGoods from "../filter/FilterDevices";
import GoodsList from "./DevicesList";
import GoodsItem from "./DeviceItem";

const GoodsPageCategorised = () => {
    const urlParams = useParams();
    console.log(urlParams);

    const selectFilteredSeries = useMemo(() => {
        const emptyArray = [];
        // Return a unique selector instance for this page so that
        // the filtered results are correctly memoized
        return createSelector(
            (res) => res.data,
            (res, filteringName) => filteringName,
            (res, filteringName, filteringValue) => filteringValue,
            (data, filteringName, filteringValue) => {
                // обработать
                return data?.products.filter((product) => product[filteringName] === filteringValue) ?? emptyArray;
            }
        );
    }, []);

    const { data, filteredData, isLoading, isSuccess, isError } = useGetCategoryGoodsQuery("Smartphones", {
        selectFromResult: (result) => ({
            ...result,
            filteredData: selectFilteredSeries(result, urlParams.filterName, urlParams.filterValue),
        }),
    });

    // console.log(filteredData);

    let content;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        // Переделать внизу
        content = filteredData.map((singleGoods) => <GoodsItem key={singleGoods.id} singleGoods={singleGoods} />);
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

export default GoodsPageCategorised;
