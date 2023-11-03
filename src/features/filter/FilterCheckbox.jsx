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
