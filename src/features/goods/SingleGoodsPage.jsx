import React from "react";
import { useGetCategoryGoodsQuery } from "./goodsSlice";

const SingleGoodsPage = () => {
    const {
        data: goods = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCategoryGoodsQuery("TVs", {
        selectFromResult: (result) => {
            console.log(result);
            return result;
        },
    });
    return <div>SingleGoodsPage</div>;
};

export default SingleGoodsPage;
