export const addPropertyToObjectAtKeyIndex = (object, positionKey = 0, newPropertyName, newPropertyValue) => {
    let keyValuePairs = Object.entries(object); //convert object to keyValuePairs ["key1", "value1"] ["key2", "value2"]
    keyValuePairs.splice(positionKey, 0, [newPropertyName, newPropertyValue]); // insert key value at the index you want like 2.
    const newObj = Object.fromEntries(keyValuePairs);
    return newObj;
};
