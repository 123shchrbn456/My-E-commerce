import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./features/goods/HomePage";
import GoodsPage from "./features/goods/GoodsPage";
import SingleGoodsPage from "./features/goods/SingleGoodsPage";
import Cart from "./features/cart/Cart";
import GoodsPageCategorised from "./features/goods/GoodsPageCategorised";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/goods" element={<GoodsPage />}></Route>
                        {/* <Route path="/goods/:filterName/:filterValue" element={<GoodsPageCategorised />}></Route> */}
                        <Route path="/goods/single-goods/:id" element={<SingleGoodsPage />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
