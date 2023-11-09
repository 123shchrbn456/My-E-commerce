import React from "react";

const DevicesChangeGrid = ({ changeGridHandler }) => {
    return (
        <div className="devices-operations__grid">
            <button name="3columns" onClick={changeGridHandler}>
                3 grid
            </button>
            <button name="1column" onClick={changeGridHandler}>
                1 grid
            </button>
        </div>
    );
};

export default DevicesChangeGrid;
