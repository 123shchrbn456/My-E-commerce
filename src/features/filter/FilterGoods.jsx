import React, { useEffect } from "react";
import { selectFiltersObj, updateFilterValue } from "./filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const FilterGoods = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log("searchParams", searchParams);
    // console.log("searchParams func", Object.fromEntries(searchParams.entries()));

    const params = {};

    searchParams.forEach((value, key) => {
        params[key] = searchParams.getAll(key);
    });

    console.log(params);

    // const onInputChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    //     dispatch(updateFilterValue({ name, value }));
    // console.log(value);
    // setFilteringInputs((filteringInputs) => ({ ...filteringInputs, [e.target.name]: value }));
    // };

    useEffect(() => {
        navigate(`${location.pathname + location.search}`);
    }, [searchParams]);

    // searchParams.getAll("brand")

    const qwe = (e) => {
        const name = e.target.dataset.name;
        const value = e.target.dataset.value;
        const exactParamArr = searchParams.getAll(name);
        const isInParamArr = exactParamArr.includes(value);

        console.log("isInParamArr", isInParamArr);
        if (exactParamArr.length === 1 && isInParamArr) {
            // Delete completely param array
            searchParams.delete(name);
            setSearchParams(searchParams);
            return;
        }
        if (exactParamArr.length > 1 && isInParamArr) {
            // Delete one param of the array
            const tempArr = exactParamArr.filter((param) => param !== value);
            setSearchParams({ [name]: [...tempArr] });
            return;
        }
        if (exactParamArr.length > 0 && !isInParamArr) {
            // add One more to this exact array
            setSearchParams({ [name]: [...exactParamArr, value] });
            return;
        }
        // Add completely new param
        return setSearchParams({ [name]: [value] });
    };

    return (
        <section className="filter-bar__container">
            <fieldset className="fieldset">
                <legend>Brand</legend>

                <label>
                    <input
                        type="checkbox"
                        name="brand"
                        data-name="brand"
                        data-value="Apple"
                        checked={searchParams.getAll("brand").includes("Apple") ? true : false}
                        onChange={qwe}
                    />
                    Apple
                </label>

                <br />

                <label>
                    <input
                        type="checkbox"
                        name="brand"
                        data-name="brand"
                        data-value="Samsung"
                        id=""
                        checked={searchParams.getAll("brand").includes("Samsung") ? true : false}
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
