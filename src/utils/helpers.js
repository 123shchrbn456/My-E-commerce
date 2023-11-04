export const addPropertyToObjectAtKeyIndex = (object, positionKey = 0, newPropertyName, newPropertyValue) => {
    let keyValuePairs = Object.entries(object); //convert object to keyValuePairs ["key1", "value1"] ["key2", "value2"]
    keyValuePairs.splice(positionKey, 0, [newPropertyName, newPropertyValue]); // insert key value at the index you want like 2.
    const newObj = Object.fromEntries(keyValuePairs);
    return newObj;
};

// Fake
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
    const brandValuesString = isMoreThanOneBrand ? brandValues.map((brand) => `&brand=${brand}`).join("") : "";
    const searchString = categoryValueString + brandValuesString;
    return searchString;
};
