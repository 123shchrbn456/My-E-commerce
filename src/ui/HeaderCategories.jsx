import { Link } from "react-router-dom";

const HeaderCategories = () => {
    return (
        <div className="header-categories">
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?category=Smartphones">
                        Smartphones
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/devices/?category=Smartphones&brand=Apple">Apple series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/devices/?category=Smartphones&brand=Apple&series=iPhone 14" className="link">
                                Iphone 14
                            </Link>
                            <Link to="/devices/?category=Smartphones&brand=Apple&series=iPhone 13" className="link">
                                Iphone 13
                            </Link>
                            <Link to="/devices/?category=Smartphones&brand=Apple&series=iPhone 12" className="link">
                                Iphone 12
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="dropdown-heading">
                            <Link to="/devices/?category=Smartphones&brand=Samsung">Samsung series</Link>
                        </div>
                        <div className="dropdown-links">
                            <Link to="/devices/?category=Smartphones&brand=Samsung&series=Galaxy S" className="link">
                                S series
                            </Link>
                            <Link to="/devices/?category=Smartphones&brand=Samsung&series=Galaxy A" className="link">
                                A series
                            </Link>
                            <Link to="/devices/?category=Smartphones&brand=Samsung&series=Galaxy Note" className="link">
                                Note series
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?category=TVs">
                        TVs
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">TVs Brands</div>
                        <div className="dropdown-links">
                            <Link className="link" to="/devices/?category=TVs&brand=LG">
                                LG
                            </Link>
                            <Link className="link" to="/devices/?category=TVs&brand=Samsung">
                                Samsung
                            </Link>
                            <Link className="link" to="/devices/?category=TVs&brand=Sony">
                                Sony
                            </Link>
                            <Link className="link" to="/devices/?category=TVs&brand=Panasonic">
                                Panasonic
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>
                    <Link className="link" to="/devices/?category=Laptops">
                        Laptops
                    </Link>
                </button>
                <div className="dropdown-menu information-grid">
                    <div>
                        <div className="dropdown-heading">Laptops Brands</div>
                        <div className="dropdown-links">
                            <Link className="link" to="/devices/?category=Laptops&brand=Dell">
                                Dell
                            </Link>
                            <Link className="link" to="/devices/?category=Laptops&brand=Acer">
                                Acer
                            </Link>
                            <Link className="link" to="/devices/?category=Laptops&brand=MSI">
                                MSI
                            </Link>
                            <Link className="link" to="/devices/?category=Laptops&brand=Razer">
                                Razer
                            </Link>
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
