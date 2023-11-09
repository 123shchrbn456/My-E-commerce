import React from "react";
import ListGrid from "../../ui/ListGrid";
import { useLocation } from "react-router-dom";
import { useGetDevicesQuery } from "./devicesSlice";
import DeviceItem from "./DeviceItem";

const DevicesList3 = ({ gridValue }) => {
    const location = useLocation();

    // receive SearchText and add to useGetDevicesQuery

    const { data: devices = [], isSuccess } = useGetDevicesQuery(location.search ?? "");

    return (
        isSuccess && (
            <ListGrid gridValue={gridValue} data={devices} render={(device) => <DeviceItem key={device.id} singleDevice={device} />} />
        )
    );
};

export default DevicesList3;
