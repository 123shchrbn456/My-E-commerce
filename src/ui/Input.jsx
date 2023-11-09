import React from "react";

const Input = ({ value, onChange, inputStyle = "regular", ...props }) => {
    return <input className={inputStyle} value={value} onChange={onChange} type="text" {...props} />;
};

export default Input;
