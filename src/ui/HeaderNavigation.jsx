import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, [auth]);

    // for dynamic styling classNames
    function isPathMatchRoute(route) {
        if (route === location.pathname) {
            return true;
        }
    }
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

                    {isAuthenticated ? (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default HeaderNavigation;
