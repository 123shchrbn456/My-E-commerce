import React from "react";
import Input from "../../ui/Input";
import { useSearchParams } from "react-router-dom";

const DevicesSearchInput = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get("q") || "";

    const searchDevicesHandler = (e) => {
        const inputValue = e.target.value;
        searchParams.set("q", inputValue);
        setSearchParams(searchParams);
        if (inputValue === "") {
            searchParams.delete("q");
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="devices-operations__search">
            <Input value={searchText} onChange={searchDevicesHandler} inputStyle={"search"} placeholder="Search a device" />
        </div>
    );
};

export default DevicesSearchInput;
