import React from "react";
import DeviceItem from "./DeviceItem";
import { useLocation } from "react-router-dom";
import { useGetDevicesQuery } from "./devicesSlice";

const DevicesList2 = () => {
    const location = useLocation();

    const { data = [], isLoading, isSuccess, isError } = useGetDevicesQuery(location.search ?? "");

    let content;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = data.map((device) => <DeviceItem key={device.id} singleDevice={device} />);
        if (data.length === 0) content = <h1>No Items found, change filters.</h1>;
    } else if (isError) {
        content = <div>Error!!!{error.toString()}</div>;
    }
    return <div className="goods-container">{content}</div>;
};

export default DevicesList2;
