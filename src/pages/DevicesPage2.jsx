import React from "react";
import FilterDevices2 from "../features/filter/FilterDevices2";
import DevicesList2 from "../features/devices/DevicesList2";
import PageWrapper from "../ui/PageWrapper";

const DevicesPage2 = () => {
    return (
        <PageWrapper page="devices">
            <FilterDevices2 />
            <DevicesList2 />
        </PageWrapper>
    );
};

export default DevicesPage2;
