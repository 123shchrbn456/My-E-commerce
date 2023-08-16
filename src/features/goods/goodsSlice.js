import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const goodsAdapter = createEntityAdapter();

const initialState = goodsAdapter.getInitialState();

export const goodsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGoods: builder.query({
            // query: (searchParam = "") => `/commodities${searchParam}`,
            query: () => `/commodities`,
            // transformResponse: (responseData) => {
            //     console.log(responseData[0]);
            //     return goodsAdapter.setAll(initialState, responseData[0].products);
            // },
            providesTags: (result, error, arg) => [
                { type: "Goods", id: "LIST" },
                ...result.map((item) => ({ type: "Goods", id: item.id })),
            ],
        }),
        getSearchGoods: builder.query({
            // query: (searchParam = "") => `/commodities${searchParam}`,
            query: (searchParams) => `/commodities-smartphones${searchParams}`,
            // transformResponse: (responseData) => {
            //     console.log(responseData[0]);
            //     return goodsAdapter.setAll(initialState, responseData[0].products);
            // },
            providesTags: (result, error, arg) => [
                { type: "Goods", id: "LIST" },
                ...result.map((item) => ({ type: "Goods", id: item.id })),
            ],
        }),
        getCategoryGoods: builder.query({
            query: (category) => `/commodities?category=${category}`,
            // transformResponse: (responseDataArr) => {
            //     const [responsObj] = responseDataArr;
            //     return responsObj.products.filter((product) => product.series === "iPhone 12");
            // },
            transformResponse: (responseDataArr) => {
                const [responsObj] = responseDataArr;
                return responsObj;
            },
            providesTags: (result, error, arg) => [
                { type: "Goods", id: "LIST" },
                ...result.products.map((product) => ({ type: "Goods", id: product.id })),
            ],
        }),
        // getSingleGoods: builder.query({
        //     query: (singleGoodsId) => `/commodities?id=${singleGoodsId}`,
        //     transformResponse: (responseDataArr) => {
        //         const [singleObj] = responseDataArr;
        //         return { ...singleObj };
        //     },
        //     // providesTags: (result, error, arg) => [{ type: "Goods", id: arg }],
        //     providesTags: (result, error, arg) => [...result.ids.map((id) => ({ type: "Goods", id }))],
        // }),
    }),
});

export const { useGetGoodsQuery, useGetCategoryGoodsQuery, useGetSearchGoodsQuery } = goodsApiSlice;

// export const selectGoodsResult = goodsApiSlice.endpoints.getGoods.select();

// const selectGoodsData = createSelector(selectGoodsResult, (goodsResult) => {
//     console.log(goodsResult);
//     return goodsResult.data;
// });

// export const {
//     selectAll: selectAllGoods,
//     selectById: selectSingleGoodsById,
//     selectIds: selectGoodsIds,
// } = goodsAdapter.getSelectors((state) => selectGoodsData(state) ?? initialState);
