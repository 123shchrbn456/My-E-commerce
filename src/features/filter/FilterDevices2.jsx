import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery, useGetBrandsForExactGategoryQuery, useGetDevicesv2Query } from "../devices/devicesSlice";
import { addPropertyToObjectAtKeyIndex, createCategoryAndBrandsSearchString } from "../../utils/helpers";
import Checkbox from "../../ui/Checkbox";
import FilterCheckbox from "./FilterCheckbox";

const exceptionsFilterCategories = ["id", "model", "category", "brand", "series", "price"];

const FilterDevices = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategoryValue = searchParams.get("category");
    const urlBrandValues = searchParams.getAll("brand");
    const isFilteringOnlyOneBrand = urlBrandValues.length === 1;

    const queryString = createCategoryAndBrandsSearchString(urlCategoryValue, urlBrandValues);

    const { data: uniqueBrandsForCategory = [] } = useGetBrandsForExactGategoryQuery(searchParams.get("category"));
    const { data = [] } = useGetDevicesQuery(queryString);

    let filterCategoriesAndValues = createFilteringData();

    if (isFilteringOnlyOneBrand) {
        // Adding filtering "series" category
        const seriesFilteringValues = [...new Set(data.map((dataItem) => dataItem.series))].filter((item) => item !== undefined);
        // Insert "series" array in first(0) position
        filterCategoriesAndValues = addPropertyToObjectAtKeyIndex(filterCategoriesAndValues, 0, "series", seriesFilteringValues);
    }

    function createFilteringData() {
        const tempObj = {};
        const allFilterNames = data?.[0] && Object.keys(data[0]).filter((dataItem) => !exceptionsFilterCategories.includes(dataItem));

        allFilterNames?.forEach((filterKey, index) => {
            const filterName = allFilterNames[index];
            let filterValues = [...new Set(data.map((dataItem) => dataItem[filterName]))];
            const isArraysInsideArray = filterValues.some((filterValue) => Array.isArray(filterValue));
            if (isArraysInsideArray) {
                // destructuring all arrays into one array, and extract only unique values
                filterValues = [...new Set(filterValues.reduce((a, b) => [...a, ...b], []))];
            }
            tempObj[filterKey] = filterValues;
        });

        return tempObj;
    }

    return (
        <section className="filter-bar__container">
            {uniqueBrandsForCategory?.length ? (
                <fieldset className="fieldset">
                    <legend>Brands</legend>
                    {uniqueBrandsForCategory.map((brandValue, index) => (
                        <FilterCheckbox key={index} filterCategoryName="brand" filterValue={brandValue} />
                    ))}
                </fieldset>
            ) : (
                ""
            )}

            {Object.keys(filterCategoriesAndValues).length &&
                Object.keys(filterCategoriesAndValues).map((filterCategoryName, index) => (
                    <fieldset key={index} className="fieldset">
                        <legend>{filterCategoryName}</legend>
                        {filterCategoriesAndValues[filterCategoryName].map((filterValue, index) => (
                            <FilterCheckbox key={index} filterCategoryName={filterCategoryName} filterValue={filterValue} />
                        ))}
                    </fieldset>
                ))}
        </section>
    );
};

export default FilterDevices;
