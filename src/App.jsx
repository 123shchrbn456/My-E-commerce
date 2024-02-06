import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import DevicesPage2 from "./pages/DevicesPage2";
import SingleDevicePage from "./pages/SingleDevicePage";
import CartPage2 from "./pages/CartPage2";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/devices" element={<DevicesPage2 />}></Route>
                        <Route path="/devices/single-device/:id" element={<SingleDevicePage />}></Route>
                        <Route path="/cart" element={<CartPage2 />}></Route>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </div>
    );
}

export default App;
