import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery } from "./devicesSlice";
import ListGrid from "../../ui/ListGrid";
import DeviceItem from "./DeviceItem";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

import { addDoc, and, collection, doc, getDocs, or, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";

const DevicesList4 = ({ gridValue }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isPaginationActive = searchParams.get("_page");
    // NEW
    const [devices, setDevices] = useState([]);
    const isSuccess = true;
    const totalCount = 30;

    useEffect(() => {
        if (!isPaginationActive) {
            searchParams.set("_page", 1);
            searchParams.set("_limit", PAGE_SIZE);
            setSearchParams(searchParams);
        }
    }, []);

    useEffect(() => {
        fetchDevices();
    }, [searchParams]);

    function getAllImages() {
        const storage = getStorage();
        const storageRef = ref(storage);
        // const specificFolderRef = ref(storage, "specific_folder");

        // Find all the prefixes and items.
        listAll(storageRef)
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

    function createFilterDevicesQuery() {
        const uniqueSearchKeys = getUniqueURLSearchKeys();
        let finalQueries = [];
        uniqueSearchKeys.forEach((searchKey) => {
            const searchValues = searchParams.getAll(searchKey);
            const searchKeyQuery = or(...searchValues.map((searchValue) => where(searchKey, "==", searchValue)));
            finalQueries.push(searchKeyQuery);
        });
        return finalQueries;
    }

    async function fetchDevices() {
        try {
            const devicesRef = collection(db, "devices");
            const filterDevicesQuery = createFilterDevicesQuery();

            const q = query(devicesRef, and(...filterDevicesQuery));

            const querySnap = await getDocs(q);
            let devicesList = [];
            querySnap.forEach((doc) => {
                return devicesList.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            console.log("devicesList", devicesList);
            setDevices(devicesList);
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        isSuccess && (
            <>
                {/* <button onClick={getAllImages}>fetchImages</button> */}
                {/* <ListGrid gridValue={gridValue} data={devices} render={(device) => <DeviceItem key={device.id} singleDevice={device} />} /> */}
                <Pagination dataCount={totalCount} />
            </>
        )
    );
};

export default DevicesList4;
