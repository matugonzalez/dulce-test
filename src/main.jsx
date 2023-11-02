import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ProvidersWrapper from "./providers/ProvidersWrapper";
import "./index.css";
import App from "./App";
//Chakra
import { ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ProvidersWrapper>   
            <ChakraProvider>
                <App />    
            </ChakraProvider>
        </ProvidersWrapper>
    </React.StrictMode>
);