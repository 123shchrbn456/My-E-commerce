import { generateFilteringData } from "../../utils/helpers";
import { apiSlice } from "../api/apiSlice";

export const devicesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDevices: builder.query({
            query: (searchParams) => `/merchandise-improved${searchParams}`,
            transformResponse(response, meta) {
                return { devices: response, totalCount: Number(meta.response.headers.get("X-Total-Count")) };
            },
            providesTags: (result, error, arg) => [
                { type: "Devices", id: "LIST" },
                ...result.devices.map((item) => ({ type: "Devices", id: item.id })),
            ],
        }),
        getFilteringData: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const categoriesResult = await fetchWithBQ(`/merchandise-improved?category=${_arg.category}`);
                const categoryAndBrandsResult = await fetchWithBQ(`/merchandise-improved${_arg.categoryAndBrandsString}`);
                const filterCategoriesAndValues = generateFilteringData(
                    categoriesResult.data,
                    categoryAndBrandsResult.data,
                    _arg.urlBrandValues
                );
                let res = {
                    ...categoryAndBrandsResult /* сохранили свойство meta */,
                    data: { ...filterCategoriesAndValues },
                };
                return res;
            },
        }),
        getSingleDevice: builder.query({
            query: (singleGoodsId) => `/merchandise-improved?id=${singleGoodsId}`,
            transformResponse: (responseDataArr) => {
                const [singleObj] = responseDataArr;
                return { ...singleObj };
            },
            providesTags: (result, error, arg) => [{ type: "Devices", id: arg }],
        }),
    }),
});

export const { useGetDevicesQuery, useGetSingleDeviceQuery, useGetFilteringDataQuery } = devicesApiSlice;
