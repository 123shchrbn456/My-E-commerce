import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesFromFirebaseQuery } from "./devicesSlice";
import ListGrid from "../../ui/ListGrid";
import DeviceItem from "./DeviceItem";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const DevicesList4 = ({ gridValue }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isPaginationActive = searchParams.get("_page");

    const { data: devices, isLoading, isSuccess } = useGetDevicesFromFirebaseQuery(createUniqueSearchParamsObj());
    // console.log("from firebase", devices);

    useEffect(() => {
        if (!isPaginationActive) {
            searchParams.set("_page", 1);
            searchParams.set("_limit", PAGE_SIZE);
            setSearchParams(searchParams);
        }
    }, []);

    function getAllImages() {
        const storage = getStorage();
        const storageRef = ref(storage);
        // const specificFolderRef = ref(storage, "apple_iphone_14_red");

        // Find all the prefixes and items.
        listAll(specificFolderRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under storageRef.
                    // You may call listAll() recursively on them.

                    listAll(folderRef).then((res) => {
                        res.items.forEach((itemRef) => {
                            // All the items under all folders of storageRef
                            getDownloadURL(itemRef).then((downloadURL) => {
                                console.log("downloadURL", downloadURL);
                            });
                        });
                    });
                });
                res.items.forEach((itemRef) => {
                    // All the items under storageRef.
                    getDownloadURL(itemRef).then((downloadURL) => {
                        console.log("downloadURL", downloadURL);
                    });
                });
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
            });
    }

    function getUniqueURLSearchKeys() {
        let searchKeys = [];
        for (const key of searchParams.keys()) {
            if (key !== "_page" && key !== "_limit") searchKeys.push(key);
        }
        const uniqueSearchKeys = [...new Set(searchKeys)];
        return uniqueSearchKeys;
    }

    function createUniqueSearchParamsObj() {
        let searchObj = {};
        const uniqueSearchKeys = getUniqueURLSearchKeys();
        uniqueSearchKeys.forEach((searchKey) => {
            searchObj[searchKey] = searchParams.getAll(searchKey);
        });
        // console.log(searchObj);
        return searchObj;
    }

    return (
        isSuccess && (
            <>
                {/* <button onClick={getAllImages}>fetchImages</button> */}
                <ListGrid gridValue={gridValue} data={devices} render={(device) => <DeviceItem key={device.id} singleDevice={device} />} />
                <Pagination dataCount={devices.length} />
            </>
        )
    );
};

export default DevicesList4;
