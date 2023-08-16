import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    color: "",
    mainCamera_Features: [],
    mainCamera_Pixels: "",
    model: "",
    price: "",
    screenRefreshRate: "",
    series: "",
    storage: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        updateFilterValue: (state, action) => {
            const { name, value } = action.payload;
            console.log(name, value);
            state[name] = value;
        },
        // setFuel: (state, action) => {
        //     state.fuel = action.payload;
        // },
        // setTransmissionType: (state, action) => {
        //     state.transmissionType = action.payload;
        // },
        // setBrand: (state, action) => {
        //     state.brand = action.payload;
        // },
    },
});

export const { updateFilterValue } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export const selectFiltersObj = (state) => state.filter;
