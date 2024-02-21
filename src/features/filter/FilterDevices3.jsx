import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generateFilteringData } from "../../utils/helpers";
import FilterCheckbox from "./FilterCheckbox";

import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const FilterDevices3 = () => {
    const [searchParams] = useSearchParams();
    const [generatedFilteringDataFromFirebase, setGeneratedFilteringDataFromFirebase] = useState({});
    const [firebaseIsLoading, setFirebaseIsLoading] = useState(true);
    const urlCategoryValue = searchParams.get("category");
    const urlBrandValues = searchParams.getAll("brand");

    useEffect(() => {
        fetchFilteringData();
    }, [searchParams]);

    async function fetchFilteringData() {
        try {
            const devicesRef = collection(db, "devices");

            // GET Categories Result
            const filterDevicesByCategoryQuery = query(devicesRef, where("category", "==", urlCategoryValue));
            const querySnapByCategory = await getDocs(filterDevicesByCategoryQuery);
            let categoriesResult = [];
            querySnapByCategory.forEach((doc) => categoriesResult.push({ id: doc.id, ...doc.data() }));

            // GET Categories and Brands Result
            const filterDevicesByCategoryAndBrandsQuery = query(
                devicesRef,
                and(
                    where("category", "==", urlCategoryValue),
                    or(...urlBrandValues.map((urlBrandValue) => where("brand", "==", urlBrandValue)))
                )
            );
            const querySnapByCategoryAndBrands = await getDocs(filterDevicesByCategoryAndBrandsQuery);
            let categoryAndBrandsResult = [];
            querySnapByCategoryAndBrands.forEach((doc) => categoryAndBrandsResult.push({ id: doc.id, ...doc.data() }));

            // Receiving "Filtering Data" for Checkboxes
            const filterCategoriesAndValues = generateFilteringData(categoriesResult, categoryAndBrandsResult, urlBrandValues);
            setGeneratedFilteringDataFromFirebase(filterCategoriesAndValues);
            setFirebaseIsLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    }

    return (
        <section className="filter-bar__container">
            {!firebaseIsLoading ? (
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
