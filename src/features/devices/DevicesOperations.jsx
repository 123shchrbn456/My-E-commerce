import React from "react";
import SortBy from "../../ui/SortBy";
import DevicesSearchInput from "./DevicesSearchInput";
import DevicesChangeGrid from "./DevicesChangeGrid";

const DevicesOperations = ({ changeGridHandler }) => {
    return (
        <section className="devices-operations">
            <DevicesChangeGrid changeGridHandler={changeGridHandler} />
            <DevicesSearchInput />
            <SortBy
                options={[
                    { value: "id|desc", label: "Date: recent to latest" },
                    { value: "price|desc", label: "Price: high to low" },
                    { value: "price|asc", label: "Price: low to high" },
                ]}
            />
        </section>
    );
};

export default DevicesOperations;
