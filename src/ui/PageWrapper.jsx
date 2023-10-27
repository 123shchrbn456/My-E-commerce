import React from "react";

const PageWrapper = ({ page = "", children }) => {
    const className = page === "devices" ? "page-goods" : "regular";
    return <div className={className}>{children}</div>;
};

export default PageWrapper;
