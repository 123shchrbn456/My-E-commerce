import { apiSlice } from "../api/apiSlice";

export const goodsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGoods: builder.query({
            query: (searchParams) => `/merchandise-improved${searchParams}`,
            providesTags: (result, error, arg) => [
                { type: "Goods", id: "LIST" },
                ...result.map((item) => ({ type: "Goods", id: item.id })),
            ],
        }),
        getBrandsForExactGategory: builder.query({
            query: (category = "") => `/merchandise-improved?category=${category}`,
            transformResponse: (responseDataArr) => {
                // Достать все фильтры отсюда
                if (!responseDataArr.length) return [];
                const allBrands = [...new Set(responseDataArr.map((dataItem) => dataItem.brand))];
                return allBrands;
            },
        }),
        getSingleGoods: builder.query({
            query: (singleGoodsId) => `/merchandise-improved?id=${singleGoodsId}`,
            transformResponse: (responseDataArr) => {
                const [singleObj] = responseDataArr;
                return { ...singleObj };
            },
            providesTags: (result, error, arg) => [{ type: "Goods", id: arg }],
        }),

        // Was made for GoodsPageCategorised.jsx
        getCategoryGoods: builder.query({
            query: (category) => `/commodities?category=${category}`,
            transformResponse: (responseDataArr) => {
                const [responsObj] = responseDataArr;
                return responsObj;
            },
            providesTags: (result, error, arg) => [
                { type: "Goods", id: "LIST" },
                ...result.products.map((product) => ({ type: "Goods", id: product.id })),
            ],
        }),
    }),
});

export const { useGetGoodsQuery, useGetCategoryGoodsQuery, useGetBrandsForExactGategoryQuery, useGetSingleGoodsQuery } =
    goodsApiSlice;
