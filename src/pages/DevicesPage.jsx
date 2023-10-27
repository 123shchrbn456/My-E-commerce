import React from "react";
import DeviceItem from "../features/devices/DeviceItem";
import { useLocation } from "react-router-dom";
import { useGetDevicesQuery } from "../features/devices/devicesSlice";
import FilterDevices from "../features/filter/FilterDevices";
import DevicesList from "../features/devices/DevicesList";
import PageWrapper from "../ui/PageWrapper";
PageWrapper;

const DevicesPage = () => {
    const location = useLocation();

    const { data = [], isLoading, isSuccess, isError } = useGetDevicesQuery(location.search ?? "");

    let content;

    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        // Переделать внизу
        content = data.map((device) => <DeviceItem key={device.id} singleDevice={device} />);
        if (data.length === 0) content = <h1>No Items found, change filters.</h1>;
    } else if (isError) {
        content = <div>Error!!!{error.toString()}</div>;
    }

    return (
        <PageWrapper page="devices">
            <FilterDevices />
            {isSuccess && <DevicesList content={content} />}
        </PageWrapper>
    );
};

export default DevicesPage;
