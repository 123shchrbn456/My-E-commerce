import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css";
import { devicesApiSlice } from "./features/devices/devicesSlice";

// import { usersApiSlice } from "./features/users/usersSlice";

// store.dispatch(devicesApiSlice.endpoints.getGoods.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
