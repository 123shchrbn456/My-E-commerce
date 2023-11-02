import React, { useState } from "react";
// import FilterDevices from "../features/filter/FilterDevices";
import FilterDevices2 from "../features/filter/FilterDevices2";
// import DevicesList from "../features/devices/DevicesList";
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
