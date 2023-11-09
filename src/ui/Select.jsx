import React from "react";

function Select({ options, value, onChange, ...props }) {
    return (
        <select value={value} onChange={onChange} {...props}>
            <option value="" disabled>
                Select
            </option>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
