import React from "react";
import { useGetSingleDeviceQuery } from "../features/devices/devicesSlice";
import { useParams } from "react-router-dom";

const SingleDevicePage = () => {
    const { id } = useParams();
    const { data, isSuccess, isLoading, isError } = useGetSingleDeviceQuery(id);
    const singleGoodsKeys =
        isSuccess && Object.keys(data).filter((key) => key !== "price" && key !== "id" && key !== "mainCamera_Features");

    let content;

    if (isLoading) {
        content = <div>...Loading</div>;
    } else if (isSuccess) {
        content = (
            <div>
                <h4>{data.brand + " " + data.model}</h4>
                {singleGoodsKeys.map((key, index) => (
                    <p key={index}>
                        {key}: {data[key]}
                    </p>
                ))}
                <ul>
                    {data.mainCamera_Features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <p>Price: {data.price}$</p>
            </div>
        );
    } else if (isError) {
        content = <div>Error </div>;
    }

    return <div>{content}</div>;
};

export default SingleDevicePage;
