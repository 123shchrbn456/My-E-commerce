import { Link } from "react-router-dom";

const HeaderNavigation = () => {
    return (
        <header className="header-navigation">
            <h1>My E-commerce store</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/add-device">Add Devices</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderNavigation;
