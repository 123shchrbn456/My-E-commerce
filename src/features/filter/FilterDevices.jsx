import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery, useGetBrandsForExactGategoryQuery, useGetDevicesv2Query } from "../devices/devicesSlice";
import { addPropertyToObjectAtKeyIndex } from "../../utils/helpers";

const exceptionsFilterCategories = ["id", "model", "category", "brand", "series", "price"];

const FilterDevices = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isFilteringOnlyOneBrand = searchParams.getAll("brand").length === 1;

    const { data: uniqueBrandsForCategory = [] } = useGetBrandsForExactGategoryQuery(searchParams.get("category"));
    const { data = [] } = useGetDevicesQuery(createCategoryAndBrandsSearchString());
    // console.log(searchParams);

    let filterTypes = createFilterTypes();

    if (isFilteringOnlyOneBrand) {
        // Adding series array for this brand
        const exactBrandSeries = [...new Set(data.map((dataItem) => dataItem.series))].filter((item) => item !== undefined);
        // filterTypes.series = exactBrandSeries;

        // Insert "series" array in first position
        filterTypes = addPropertyToObjectAtKeyIndex(filterTypes, 0, "series", exactBrandSeries);
    }

    function createCategoryAndBrandsSearchString() {
        const categoryValue = searchParams.get("category");
        const brandValues = searchParams.getAll("brand");
        const isMoreThanOneBrand = brandValues.length;
        let categoryValueString = `?category=${categoryValue}`;
        const brandValuesString = isMoreThanOneBrand ? brandValues.map((brand) => `&brand=${brand}`).join("") : "";
        const searchString = categoryValueString + brandValuesString;
        return searchString;
    }

    function createFilterTypes() {
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

    const isCheckboxShouldBeChecked = (key, filterValue) => {
        key === "mainCamera_Features" ? (key += "_like") : key;
        const booleanResult = searchParams.getAll(key).includes(filterValue) ? true : false;
        return booleanResult;
    };

    const onChangeFilterInputs = (e) => {
        // переделывать для mainCamera_Features
        let name = e.target.dataset.name;
        const value = e.target.dataset.value;
        name === "mainCamera_Features" ? (name += "_like") : name;
        const exactParamArr = searchParams.getAll(name);
        const isInParamArr = exactParamArr.includes(value);

        // Delete completely param array
        if (exactParamArr.length === 1 && isInParamArr) {
            searchParams.delete(name);
            setSearchParams(searchParams);
            return;
        }
        // Delete one param of the array
        if (exactParamArr.length > 1 && isInParamArr) {
            const choosenArrParams = exactParamArr.filter((param) => param !== value);
            searchParams.delete(name);
            choosenArrParams.forEach((item) => searchParams.append([name], item));
            setSearchParams(searchParams);
            return;
        }
        // Add One more to this exact array
        if (exactParamArr.length > 0 && !isInParamArr) {
            searchParams.append([name], [value]);
            setSearchParams(searchParams);
            return;
        }
        // Add completely new param
        searchParams.append([name], [value]);
        return setSearchParams(searchParams);
    };

    return (
        <section className="filter-bar__container">
            {uniqueBrandsForCategory?.length ? (
                <fieldset className="fieldset">
                    <legend>Brands</legend>
                    {uniqueBrandsForCategory.map((brandValue, index) => (
                        <div className="filter-option" key={index}>
                            <input
                                type="checkbox"
                                id={"brand" + brandValue}
                                name="brand"
                                data-name="brand"
                                data-value={brandValue}
                                checked={searchParams.getAll("brand").includes(brandValue) ? true : false}
                                onChange={onChangeFilterInputs}
                            />
                            <label htmlFor={"brand" + brandValue}>{brandValue}</label>
                        </div>
                    ))}
                </fieldset>
            ) : (
                ""
            )}
            {Object.keys(filterTypes).length &&
                Object.keys(filterTypes).map((filterCategoryName, index) => (
                    <fieldset key={index} className="fieldset">
                        <legend>{filterCategoryName}</legend>
                        {filterTypes[filterCategoryName].map((filterValue, index) => (
                            <div className="filter-option" key={index}>
                                <input
                                    type="checkbox"
                                    id={filterCategoryName + filterValue}
                                    name={filterCategoryName}
                                    data-name={filterCategoryName}
                                    data-value={filterValue}
                                    // checked={searchParams.getAll(key).includes(filterValue) ? true : false}
                                    checked={isCheckboxShouldBeChecked(filterCategoryName, filterValue)}
                                    onChange={onChangeFilterInputs}
                                />
                                <label htmlFor={filterCategoryName + filterValue}>{filterValue}</label>
                            </div>
                        ))}
                    </fieldset>
                ))}
        </section>
    );
};

export default FilterDevices;
