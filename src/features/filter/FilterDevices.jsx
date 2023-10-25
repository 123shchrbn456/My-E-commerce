import React, { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery, useGetBrandsForExactGategoryQuery } from "../devices/devicesSlice";

const exceptionsFilterCategories = ["id", "model", "category", "brand", "series", "price"];

const FilterDevices = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: allBrands = [] } = useGetBrandsForExactGategoryQuery(searchParams.get("category"));
    const { data = [], isSuccess } = useGetDevicesQuery(createSearchString());

    let filterTypes = createFilterTypes();

    if (searchParams.getAll("brand").length === 1) {
        const allSeries = [...new Set(data.map((dataItem) => dataItem.series))].filter((item) => item !== undefined);
        filterTypes.series = allSeries;
    }

    function createSearchString() {
        const categoryValue = searchParams.get("category");
        const brandValues = searchParams.getAll("brand");
        let categoryValueString = `?category=${categoryValue}`;
        const brandValuesString = brandValues.length ? brandValues.map((brand) => `&brand=${brand}`).join("") : "";
        const searchString = categoryValueString + brandValuesString;
        return searchString;
    }

    function createFilterTypes() {
        const tempObj = {};
        const allFilterNames =
            data?.[0] && Object.keys(data[0]).filter((dataItem) => !exceptionsFilterCategories.includes(dataItem));

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
            {allBrands?.length ? (
                <fieldset className="fieldset">
                    <legend>Brands</legend>
                    {allBrands.map((brand, index) => (
                        <Fragment key={index}>
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="brand"
                                    data-name="brand"
                                    data-value={brand}
                                    checked={searchParams.getAll("brand").includes(brand) ? true : false}
                                    onChange={onChangeFilterInputs}
                                />
                                {brand}
                            </label>
                            <br key={Date.now()} />
                        </Fragment>
                    ))}
                </fieldset>
            ) : (
                ""
            )}
            {Object.keys(filterTypes).length &&
                Object.keys(filterTypes).map((key, index) => (
                    <fieldset key={index} className="fieldset">
                        <legend>{key}</legend>
                        {filterTypes[key].map((filterValue, index) => (
                            <Fragment key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name={key}
                                        data-name={key}
                                        data-value={filterValue}
                                        // checked={searchParams.getAll(key).includes(filterValue) ? true : false}
                                        checked={isCheckboxShouldBeChecked(key, filterValue)}
                                        onChange={onChangeFilterInputs}
                                    />
                                    {filterValue}
                                </label>
                                <br></br>
                            </Fragment>
                        ))}
                    </fieldset>
                ))}
        </section>
    );
};

export default FilterDevices;
