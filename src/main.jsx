import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ProvidersWrapper from "./providers/ProvidersWrapper";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ProvidersWrapper>
            <App />    
        </ProvidersWrapper>
    </React.StrictMode>
);