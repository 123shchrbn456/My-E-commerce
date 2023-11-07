import React from "react";

const DevicesOperations = () => {
    return (
        <section className="devices-operations">
            <div className="devices-operations__grid">
                <button>3 grid</button>
                <button>1 grid</button>
            </div>
            <div className="devices-operations__search">
                <input type="text" placeholder="Search a device" />
            </div>
            <div className="devices-operations__sort">
                <select name="" id="">
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </section>
    );
};

export default DevicesOperations;
