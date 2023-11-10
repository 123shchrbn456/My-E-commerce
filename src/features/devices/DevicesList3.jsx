import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetDevicesQuery } from "./devicesSlice";
import ListGrid from "../../ui/ListGrid";
import DeviceItem from "./DeviceItem";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

const DevicesList3 = ({ gridValue }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const isPaginationActive = searchParams.get("_page");

    useEffect(() => {
        if (!isPaginationActive) {
            searchParams.set("_page", 1);
            searchParams.set("_limit", PAGE_SIZE);
            setSearchParams(searchParams);
        }
    }, []);

    const { data: { devices, totalCount } = {}, isSuccess } = useGetDevicesQuery(location.search ?? "");

    return (
        isSuccess && (
            <>
                <ListGrid gridValue={gridValue} data={devices} render={(device) => <DeviceItem key={device.id} singleDevice={device} />} />
                <Pagination dataCount={totalCount} />
            </>
        )
    );
};

export default DevicesList3;
