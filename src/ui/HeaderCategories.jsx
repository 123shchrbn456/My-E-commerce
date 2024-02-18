import { Link } from "react-router-dom";

const HeaderCategories = () => {
    return (
        <div className="header-categories">
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?_page=1&_limit=9&category=smartphones">
                        Smartphones
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=apple">Apple series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=apple&series=iphone_14" className="link">
                                Iphone 14
                            </Link>
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=apple&series=iphone_13" className="link">
                                Iphone 13
                            </Link>
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=apple&series=iphone_12" className="link">
                                Iphone 12
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=samsung">Samsung series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=samsung&series=galaxy_s" className="link">
                                S series
                            </Link>
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=samsung&series=galaxy_a" className="link">
                                A series
                            </Link>
                            <Link to="/devices/?_page=1&_limit=9&category=smartphones&brand=samsung&series=galaxy_note" className="link">
                                Note series
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?_page=1&_limit=9&category=tvs">
                        TVs
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">TVs Brands</div>
                        <div className="dropdown-links">
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=tvs&brand=lg">
                                LG
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=tvs&brand=samsung">
                                Samsung
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=tvs&brand=sony">
                                Sony
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=tvs&brand=panasonic">
                                Panasonic
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?_page=1&_limit=9&category=laptops">
                        Laptops
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">Laptops Brands</div>
                        <div className="dropdown-links">
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=laptops&brand=dell">
                                Dell
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=laptops&brand=acer">
                                Acer
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=laptops&brand=msi">
                                MSI
                            </Link>
                            <Link className="link" to="/devices/?_page=1&_limit=9&category=laptops&brand=razer">
                                Razer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    Login
                </button>
                <div className="dropdown-menu">
                    <LoginForm />
                </div>
            </div> */}
        </div>
    );
};

export default HeaderCategories;
