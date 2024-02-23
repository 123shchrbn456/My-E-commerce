import { generateFilteringData } from "../../utils/helpers";
import { apiSlice } from "../api/apiSlice";
import { db } from "../../firebase";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";

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
        getDevicesFromFirebase: builder.query({
            async queryFn(uniqueSearchParamsObj) {
                try {
                    const devicesRef = collection(db, "devices");

                    let filterDevicesQuery = [];
                    const uniqueSearchKeys = Object.keys(uniqueSearchParamsObj);

                    // create Firebase query for each URL search key ?searchKey=searchValue
                    uniqueSearchKeys.forEach((searchKey) => {
                        const searchValues = uniqueSearchParamsObj[searchKey];
                        const searchKeyQuery = or(...searchValues.map((searchValue) => where(searchKey, "==", searchValue)));
                        filterDevicesQuery.push(searchKeyQuery);
                    });

                    const q = query(devicesRef, and(...filterDevicesQuery));

                    const querySnap = await getDocs(q);
                    let devicesList = [];

                    querySnap.forEach((doc) => {
                        devicesList.push({ id: doc.id, ...doc.data(), timeStamp: doc.data().timeStamp?.seconds });
                    });
                    return { data: devicesList };
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: [{ type: "Devices" }],
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
        getFilteringDataFromFirebase: builder.query({
            async queryFn({ urlCategoryValue, urlBrandValues = [] }) {
                console.log("!!!!!!", urlCategoryValue, urlBrandValues);
                try {
                    const devicesRef = collection(db, "devices");

                    // GET Categories Result
                    const filterDevicesByCategoryQuery = query(devicesRef, where("category", "==", urlCategoryValue));
                    const querySnapByCategory = await getDocs(filterDevicesByCategoryQuery);
                    let categoriesResult = [];
                    querySnapByCategory.forEach((doc) => categoriesResult.push({ id: doc.id, ...doc.data() }));

                    // GET Categories and Brands Result
                    const filterDevicesByCategoryAndBrandsQuery = query(
                        devicesRef,
                        and(
                            where("category", "==", urlCategoryValue),
                            or(...urlBrandValues.map((urlBrandValue) => where("brand", "==", urlBrandValue)))
                        )
                    );
                    const querySnapByCategoryAndBrands = await getDocs(filterDevicesByCategoryAndBrandsQuery);
                    let categoryAndBrandsResult = [];
                    querySnapByCategoryAndBrands.forEach((doc) => categoryAndBrandsResult.push({ id: doc.id, ...doc.data() }));

                    // Receiving "Filtering Data" for Checkboxes
                    const filterCategoriesAndValues = generateFilteringData(categoriesResult, categoryAndBrandsResult, urlBrandValues);
                    return { data: filterCategoriesAndValues };
                } catch (err) {
                    throw new Error(err);
                }
            },
            providesTags: [{ type: "FilteringValues" }],
        }),
        getSingleDevice: builder.query({
            query: (singleGoodsId) => `/merchandise-improved?id=${singleGoodsId}`,
            transformResponse: (responseDataArr) => {
                const [singleObj] = responseDataArr;
                return { ...singleObj };
            },
            providesTags: (result, error, arg) => [{ type: "Devices", id: arg }],
        }),
        getSingleDeviceFromFirebase: builder.query({
            async queryFn(id) {
                //
                try {
                    const devicesRef = collection(db, "devices");
                    const q = query(devicesRef, where("id", "==", Number(id)));
                    const querySnap = await getDocs(q);
                    let result2;
                    // It also works
                    // querySnap.forEach((doc) => {
                    //     result2 = {
                    //         id: doc.id,
                    //         ...doc.data(),
                    //         timeStamp: doc.data.timeStamp?.seconds,
                    //     };
                    // });
                    result2 = {
                        ...querySnap.docs[0].data(),
                        timeStamp: querySnap.docs[0].data().timeStamp.seconds,
                    };
                    console.log("result!!!!!", result2);
                    return { data: result2 };
                } catch (err) {
                    throw new Error(err);
                }
            },
            providesTags: (result, error, arg) => [{ type: "Devices", id: arg }],
        }),
    }),
});

export const {
    useGetDevicesQuery,
    useGetSingleDeviceQuery,
    useGetFilteringDataQuery,
    useGetDevicesFromFirebaseQuery,
    useGetFilteringDataFromFirebaseQuery,
    useGetSingleDeviceFromFirebaseQuery,
} = devicesApiSlice;
