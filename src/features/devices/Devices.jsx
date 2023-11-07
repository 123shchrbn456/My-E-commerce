import React from "react";
import DevicesOperations from "./DevicesOperations";
import DevicesList3 from "./DevicesList3";

const Devices = () => {
    return (
        <section className="devices-section">
            <DevicesOperations />
            <DevicesList3 />
        </section>
    );
};

export default Devices;
