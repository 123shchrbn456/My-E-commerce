import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./features/devices/HomePage";
import DevicesPage from "./features/devices/DevicesPage";
import SingleDevicePage from "./features/devices/SingleDevicePage";
import Cart from "./features/cart/Cart";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/devices" element={<DevicesPage />}></Route>
                        {/* <Route path="/goods/:filterName/:filterValue" element={<GoodsPageCategorised />}></Route> */}
                        <Route path="/devices/single-device/:id" element={<SingleDevicePage />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
