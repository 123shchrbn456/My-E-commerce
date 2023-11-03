const Button = ({ type = "primary", children, ...props }) => {
    const types = {
        primary: "black",
        secondary: "grey",
        danger: "red",
    };
    return (
        <button className={types[type]} {...props}>
            {children}
        </button>
    );
};

export default Button;
