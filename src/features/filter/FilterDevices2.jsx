import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetFilteringDataQuery } from "../devices/devicesSlice";
import { createCategoryAndBrandsSearchString } from "../../utils/helpers";
import FilterCheckbox from "./FilterCheckbox";

const FilterDevices = () => {
    const [searchParams] = useSearchParams();
    const urlCategoryValue = searchParams.get("category");
    const urlBrandValues = searchParams.getAll("brand");

    const categoryAndBrandsString = createCategoryAndBrandsSearchString(urlCategoryValue, urlBrandValues);

    const { data: generatedFilteringData, isSuccess } = useGetFilteringDataQuery({
        category: urlCategoryValue,
        categoryAndBrandsString,
        urlBrandValues,
    });

    return (
        <section className="filter-bar__container">
            {isSuccess &&
                Object.keys(generatedFilteringData).map((filterCategoryName, index) => (
                    <fieldset key={index} className="fieldset">
                        <legend>{filterCategoryName}</legend>
                        {generatedFilteringData[filterCategoryName].map((filterValue, index) => (
                            <FilterCheckbox key={index} filterCategoryName={filterCategoryName} filterValue={filterValue} />
                        ))}
                    </fieldset>
                ))}
        </section>
    );
};

export default FilterDevices;
