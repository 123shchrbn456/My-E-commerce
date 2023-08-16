import { Link } from "react-router-dom";
import React from "react";

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
                        <Link to="/goods">All Goods</Link>
                    </li>
                    <li>
                        <Link to="/add-goods">Add Goods</Link>
                    </li>
                    <li>
                        <Link to="/goods/single-goods/:id">Single Goods Item</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderNavigation;
