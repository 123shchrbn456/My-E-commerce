import React, { useState } from "react";
import DevicesOperations from "./DevicesOperations";
// import DevicesList3 from "./DevicesList3";
import DevicesList4 from "./DevicesList4";

const Devices = () => {
    const [gridValue, setGridValue] = useState("3columns");

    const changeGridHandler = (e) => {
        setGridValue(e.target.name);
    };

    return (
        <section className="devices-section">
            <DevicesOperations changeGridHandler={changeGridHandler} />
            {/* <DevicesList3 gridValue={gridValue} /> */}
            <DevicesList4 gridValue={gridValue} />
        </section>
    );
};

export default Devices;
