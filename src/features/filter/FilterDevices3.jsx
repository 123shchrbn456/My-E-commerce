import React from "react";
import { useSearchParams } from "react-router-dom";
import FilterCheckbox from "./FilterCheckbox";
import { useGetFilteringDataFromFirebaseQuery } from "../devices/devicesSlice";

const FilterDevices3 = () => {
    const [searchParams] = useSearchParams();
    const urlCategoryValue = searchParams.get("category");
    const urlBrandValues = searchParams.getAll("brand");

    const { data: generatedFilteringDataFromFirebase, isLoading } = useGetFilteringDataFromFirebaseQuery({
        urlCategoryValue,
        urlBrandValues,
    });

    return (
        <section className="filter-bar__container">
            {!isLoading ? (
                Object.keys(generatedFilteringDataFromFirebase).map((filterCategoryName, index) => (
                    <fieldset key={index} className="fieldset">
                        {/* Capitalize first letter right here */}
                        <legend>{filterCategoryName}</legend>
                        {generatedFilteringDataFromFirebase[filterCategoryName].map((filterValue, index) => (
                            <FilterCheckbox key={index} filterCategoryName={filterCategoryName} filterValue={filterValue} />
                        ))}
                    </fieldset>
                ))
            ) : (
                <div>Loading filters...</div>
            )}
        </section>
    );
};

export default FilterDevices3;
