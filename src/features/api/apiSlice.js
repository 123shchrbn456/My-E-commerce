import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Devices", "FilteringValues", "PersonalOrders"],
    endpoints: (builder) => ({}),
});
