import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetDevicesQuery } from "./devicesSlice";
import ListGrid from "../../ui/ListGrid";
import DeviceItem from "./DeviceItem";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";

const DevicesList4 = ({ gridValue }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isPaginationActive = searchParams.get("_page");
    // NEW
    const [devices, setDevices] = useState([]);
    const isSuccess = true;
    const totalCount = 30;

    const searchParamsObject = Object.fromEntries([...searchParams]);
    const searchParamsArrays = [...searchParams];

    useEffect(() => {
        if (!isPaginationActive) {
            searchParams.set("_page", 1);
            searchParams.set("_limit", PAGE_SIZE);
            setSearchParams(searchParams);
        }
    }, []);

    useEffect(() => {
        console.log("triggered");
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

    async function fetchSmartphones() {
        try {
            const smartphonesRef = collection(db, "smartphones");

            const onlyFilteringParams = searchParamsArrays.filter((item) => item[0] !== "_page" && item[0] !== "_limit");
            const whereQuery = onlyFilteringParams.map(([filterName, filterValue]) => where(filterName, "==", filterValue));
            // const q = query(smartphonesRef, where("color", "==", "black"), where("color", "==", "blue")); /* not working this way */
            const q = query(smartphonesRef, ...whereQuery);

            const querySnap = await getDocs(q);
            let smartphonesList = [];
            querySnap.forEach((doc) => {
                return smartphonesList.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            console.log("smartphonesList", smartphonesList);
            setDevices(smartphonesList);
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        isSuccess && (
            <>
                <button onClick={fetchSmartphones}>fetchSmartphones</button>
                {/* <button onClick={getAllImages}>fetchImages</button> */}
                {/* <ListGrid gridValue={gridValue} data={devices} render={(device) => <DeviceItem key={device.id} singleDevice={device} />} /> */}
                <Pagination dataCount={totalCount} />
            </>
        )
    );
};

export default DevicesList4;
