import React from "react";
import Checkbox from "../../ui/Checkbox";
import { useSearchParams } from "react-router-dom";

const FilterCheckbox = ({ filterCategoryName, filterValue }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isCheckboxShouldBeChecked = (key, filterValue) => {
        key === "mainCamera_Features" ? (key += "_like") : key;
        const booleanResult = searchParams.getAll(key).includes(filterValue) ? true : false;
        return booleanResult;
    };

    const onChangeFilterInputs = (e) => {
        // переделывать для mainCamera_Features
        const isChecked = e.target.checked;
        let name = e.target.dataset.name;
        const value = e.target.dataset.value;
        name === "mainCamera_Features" ? name + "_like" : name;

        // Add One more to this exact array or Add completely new param
        if (isChecked) {
            searchParams.append([name], [value]);
            setSearchParams(searchParams);
            return;
        }

        // Delete completely param array or delete one param of the array
        if (!isChecked) {
            searchParams.delete(name, value);
            setSearchParams(searchParams);
            return;
        }
    };

    return (
        <Checkbox
            inputId={filterCategoryName + filterValue}
            name={filterCategoryName}
            dataName={filterCategoryName}
            dataValue={filterValue}
            checked={isCheckboxShouldBeChecked(filterCategoryName, filterValue)}
            onChange={onChangeFilterInputs}
            labelName={filterValue}
        />
    );
};

export default FilterCheckbox;
