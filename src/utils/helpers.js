export const addPropertyToObjectAtKeyIndex = (object, positionKey = 0, newPropertyName, newPropertyValue) => {
    let keyValuePairs = Object.entries(object); //convert object to keyValuePairs ["key1", "value1"] ["key2", "value2"]
    keyValuePairs.splice(positionKey, 0, [newPropertyName, newPropertyValue]); // insert key value at the index you want like 2.
    const newObj = Object.fromEntries(keyValuePairs);
    return newObj;
};

// Fake for DevicesCart.jsx
export const useSendCartItemsMutation = () => {
    const q = (cartItems) => {
        console.log(cartItems);
    };
    return [q];
};

export const createCategoryAndBrandsSearchString = (categoryValue, brandValues) => {
    // In case there are two or more brands are being filtered
    const isMoreThanOneBrand = brandValues.length;
    let categoryValueString = `?category=${categoryValue}`;
    const brandValuesString = isMoreThanOneBrand
        ? brandValues
              .sort()
              .map((brand) => `&brand=${brand}`)
              .join("")
        : "";
    const searchString = categoryValueString + brandValuesString;
    return searchString;
};

export const extractUniqueValuesFromArray = (data, filteringParam) => {
    return [...new Set(data.map((dataItem) => dataItem[filteringParam]))];
};

export const generateFilteringData = (categoriesData, categoryAndBrandsResult, urlBrandValues) => {
    const exceptionsFilterCategories = ["id", "model", "category", "brand", "series", "price", "timeStamp", "imgURLs"];
    let tempObj = {};

    const brandsFilteringValues = extractUniqueValuesFromArray(categoriesData, "brand");
    tempObj.brand = brandsFilteringValues;

    if (urlBrandValues.length === 1) {
        const seriesFilteringValues = extractUniqueValuesFromArray(categoryAndBrandsResult, "series");
        tempObj.series = seriesFilteringValues;
    }

    const allFilterNames =
        categoryAndBrandsResult?.[0] &&
        Object.keys(categoryAndBrandsResult[0]).filter((dataItem) => !exceptionsFilterCategories.includes(dataItem));

    allFilterNames?.forEach((filterKey, index) => {
        const filterName = allFilterNames[index];
        let filterValues = [...new Set(categoryAndBrandsResult.map((dataItem) => dataItem[filterName]))];
        const isArraysInsideArray = filterValues.some((filterValue) => Array.isArray(filterValue));
        if (isArraysInsideArray) {
            // destructuring all arrays into one array, and extract only unique values
            filterValues = [...new Set(filterValues.reduce((a, b) => [...a, ...b], []))];
        }
        tempObj[filterKey] = filterValues;
    });
    return tempObj;
};
