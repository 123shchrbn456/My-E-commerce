// function Checkbox({ checked, onChange, disabled = false, id, children }) {
function Checkbox({ inputId, name, dataName, dataValue, checked, onChange, disabled = false, labelName }) {
    return (
        <>
            {/* <input type="checkbox" id={id} checked={checked} onChange={onChange} disabled={disabled} />
            <label htmlFor={!disabled ? id : ""}>{children}</label> */}
            <div className="filter-option">
                <input
                    type="checkbox"
                    id={inputId}
                    name={name}
                    data-name={dataName}
                    data-value={dataValue}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <label htmlFor={inputId}>{labelName}</label>
            </div>
        </>
    );
}

export default Checkbox;
