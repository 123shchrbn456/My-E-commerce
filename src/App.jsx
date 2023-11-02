import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import DevicesPage from "./pages/DevicesPage";
import SingleDevicePage from "./pages/SingleDevicePage";
import CartPage from "./pages/CartPage";
import CartPage2 from "./pages/CartPage2";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/devices" element={<DevicesPage />}></Route>
                        {/* <Route path="/goods/:filterName/:filterValue" element={<GoodsPageCategorised />}></Route> */}
                        <Route path="/devices/single-device/:id" element={<SingleDevicePage />}></Route>
                        {/* <Route path="/cart" element={<CartPage />}></Route> */}
                        <Route path="/cart" element={<CartPage2 />}></Route>
                        <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
