import React from "react";
import PageWrapper from "../ui/PageWrapper";
import FilterDevices2 from "../features/filter/FilterDevices2";
// import DevicesList2 from "../features/devices/DevicesList2";
import Devices from "../features/devices/Devices";

const DevicesPage2 = () => {
    return (
        <PageWrapper page="devices">
            <FilterDevices2 />
            {/* <DevicesList2 /> */}
            <Devices />
        </PageWrapper>
    );
};

export default DevicesPage2;
