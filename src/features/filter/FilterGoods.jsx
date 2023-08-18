import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGetGoodsQuery, useGetBrandsForExactGategoryQuery } from "../goods/goodsSlice";

const FilterGoods = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterSeries, setFilterSeries] = useState(null);

    const { data = [], isSuccess } = useGetGoodsQuery(location.search ?? "");
    const { data: allBrands = [] } = useGetBrandsForExactGategoryQuery(searchParams.get("category"));

    // console.log(allBrands);

    const allFilterTypes = data[0]
        ? Object.keys(data[0]).filter(
              (dataItem) => dataItem !== "id" && dataItem !== "model" && dataItem !== "category"
          )
        : "No data available";

    // if (allBrands.length && filterBrands === null) {
    // const allBrands = [...new Set(data.map((dataItem) => dataItem.brand))];
    // console.log("allBrands", allBrands);
    // setFilterBrands(allBrands);
    // отправлять в локал сторедж allBrands и searchParams.get("category")
    // доставать из локал стореджа бренды, если searchParams.get("category") !== локал сторедж брендам, тогда менять их
    // }

    if (searchParams.getAll("brand").length === 1) {
        const allSeries = [...new Set(data.map((dataItem) => dataItem.series))].filter((item) => item !== undefined);
        console.log("allSeries", allSeries);
        // setFilterSeries(allSeries);
    }

    useEffect(() => {
        navigate(`${location.pathname + location.search}`);
    }, [searchParams]);

    //
    // useEffect(() => {
    //     alert("category changed");
    // }, [sadsadasd]);

    // useMemo(() => alert("category changed"), [sadsadasd]);

    // попробовать useMemo
    // попробовать useCallback

    const onChangeFilterInputs = (e) => {
        const name = e.target.dataset.name;
        const value = e.target.dataset.value;
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
            const tempArr = exactParamArr.filter((param) => param !== value);
            searchParams.delete(name);
            searchParams.append([name], [...tempArr]);
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
        <section className="filter-bar__container">
            {/* <fieldset className="fieldset"> */}
            {/* <legend>Brand</legend> */}
            {allBrands?.length ? (
                <fieldset className="fieldset">
                    <legend>Brands</legend>
                    {allBrands.map((brand, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="brand"
                                data-name="brand"
                                data-value={brand}
                                checked={searchParams.getAll("brand").includes(brand) ? true : false}
                                onChange={onChangeFilterInputs}
                            />
                            {brand}
                        </label>
                    ))}
                </fieldset>
            ) : (
                ""
            )}

            {/* <label>
                    <input
                        type="checkbox"
                        name="brand"
                        data-name="brand"
                        data-value="Apple"
                        checked={searchParams.getAll("brand").includes("Apple") ? true : false}
                        onChange={onChangeFilterInputs}
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
                        onChange={onChangeFilterInputs}
                    />
                    Samsung
                </label> */}
            {/* </fieldset> */}
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
