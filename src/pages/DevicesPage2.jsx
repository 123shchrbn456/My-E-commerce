import React from "react";
import PageWrapper from "../ui/PageWrapper";
// import FilterDevices2 from "../features/filter/FilterDevices2";
import FilterDevices3 from "../features/filter/FilterDevices3";
import Devices from "../features/devices/Devices";

const DevicesPage2 = () => {
    return (
        <PageWrapper page="devices">
            {/* <FilterDevices2 /> */}
            <FilterDevices3 />
            <Devices />
        </PageWrapper>
    );
};

export default DevicesPage2;
