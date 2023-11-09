import React from "react";

const ListGrid = ({ gridValue, data, render }) => {
    const gridTypes = {
        "1column": "fr-1",
        "2columns": "fr-2",
        "3columns": "fr-3",
        "4columns": "fr-4",
    };

    if (!data.length) return <h2>No data to show at the moment</h2>;

    return <div className={`list-grid ${gridTypes[gridValue]}`}>{data.map(render)}</div>;
};

export default ListGrid;
