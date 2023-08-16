import React, { useEffect } from "react";
import { selectFiltersObj, updateFilterValue } from "./filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const FilterGoods = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("searchParams", searchParams);

    const filterObj = useSelector(selectFiltersObj);
    // console.log(filterObj);

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        dispatch(updateFilterValue({ name, value }));

        // console.log(value);
        // setFilteringInputs((filteringInputs) => ({ ...filteringInputs, [e.target.name]: value }));
    };

    useEffect(() => {
        navigate(`${location.pathname + location.search}`);
    }, [searchParams]);

    const qwe = (e) => {
        const isAlreadyInURL = searchParams.getAll("brand");
        console.log("isAlreadyInURL", isAlreadyInURL);
        if (isAlreadyInURL.length > 0) {
            searchParams.delete("brand");
            setSearchParams(searchParams);
            // navigate(`${location.pathname + location.search}`);

            return;
        }
        // setSearchParams({ brand: ["iPhone 12", "iPhone 13"] });
        return setSearchParams({ brand: "Samsung" });
        // navigate(`${location.pathname + location.search}`);
    };

    return (
        <section className="filter-bar__container">
            <fieldset className="fieldset">
                <legend>Brand</legend>

                <label>
                    <input
                        type="checkbox"
                        name="brand=Apple"
                        id=""
                        checked={filterObj?.brand === "" ? false : true}
                        onChange={onInputChange}
                    />
                    Apple
                </label>

                <br />

                <label>
                    <input
                        type="checkbox"
                        name="brand"
                        id=""
                        value="Samsung"
                        // checked={filteringInputs.olderThan30}
                        onChange={qwe}
                    />
                    Samsung
                </label>
            </fieldset>
            {/* Fieldset */}
            <fieldset className="fieldset">
                <legend>Series</legend>

                <label>
                    <input
                        type="checkbox"
                        name="series"
                        id=""
                        // checked={filteringInputs.series}
                        // onChange={onInputChange}
                    />
                    iPhone 14
                </label>

                <br />

                <label>
                    <input
                        type="checkbox"
                        name="series"
                        id=""
                        // checked={filteringInputs.series}
                        // onChange={onInputChange}
                    />
                    S series
                </label>
            </fieldset>
            {/* Fieldset */}
            <fieldset className="fieldset">
                <legend>Storage</legend>

                <label>
                    <input
                        type="checkbox"
                        name="olderThan30"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    16 GB
                </label>

                <br />

                <label>
                    <input
                        type="checkbox"
                        name="olderThan30"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    32 GB
                </label>
                <br />

                <label>
                    <input
                        type="checkbox"
                        name="olderThan30"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    64 GB
                </label>
                <br />

                <label>
                    <input
                        type="checkbox"
                        name="olderThan30"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    128 GB
                </label>
            </fieldset>

            {/* Fieldset */}
            <fieldset className="fieldset">
                <legend>Price</legend>

                <label>
                    <input
                        type="text"
                        name="minPrice"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    Min
                </label>

                <br />

                <label>
                    <input
                        type="text"
                        name="maxPrice"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    Max
                </label>
            </fieldset>

            {/* Fieldset */}
            <fieldset className="fieldset">
                <legend>Camera Features</legend>

                <label>
                    <input
                        type="checkbox"
                        name="minPrice"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    optical stabilization
                </label>

                <br />

                <label>
                    <input
                        type="checkbox"
                        name="maxPrice"
                        id=""
                        // checked={filteringInputs.olderThan30}
                        // onChange={onInputChange}
                    />
                    digital stabilization
                </label>
            </fieldset>

            {/*  */}
            <p className="filter-bar--item">
                <label>
                    <b>Name Search:</b>
                    <input
                        type="text"
                        name="nameQuery"
                        id=""
                        // value={filteringInputs.nameQuery}
                        // onChange={onInputChange}
                    />
                </label>
            </p>
        </section>
    );
};

export default FilterGoods;
