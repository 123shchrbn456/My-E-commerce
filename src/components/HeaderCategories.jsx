import React from "react";
import { Link } from "react-router-dom";
import { useGetGoodsQuery } from "../features/goods/goodsSlice";

const HeaderCategories = () => {
    // Сделать здесь запрос ко всему
    // И сделать запрос в другом месте ко всему
    // const { data: goods = [], isLoading, isSuccess, isError, error } = useGetGoodsQuery();

    // console.log(goods);
    return (
        <div className="header-categories">
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    Smartphones
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/goods/brand/Apple">Apple series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/goods/series/iPhone 14" className="link">
                                Iphone 14
                            </Link>
                            <Link to="/goods/series/iPhone 13" className="link">
                                Iphone 13
                            </Link>
                            <Link to="/goods/series/iPhone 12" className="link">
                                Iphone 12
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/goods/brand/Samsung">Samsung series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/goods/series/Galaxy S" className="link">
                                S series
                            </Link>
                            <Link to="/goods/series/Galaxy A" className="link">
                                A series
                            </Link>
                            <Link to="/goods/series/Galaxy Note" className="link">
                                Note series
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    TVs
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">TVs Brands</div>
                        <div className="dropdown-links">
                            <a href="#" className="link">
                                LG
                            </a>
                            <a href="#" className="link">
                                Samsung
                            </a>
                            <a href="#" className="link">
                                Kiwi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    Login
                </button>
                <div className="dropdown-menu">
                    <form className="login-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeaderCategories;
