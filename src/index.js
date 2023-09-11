import "./index.css";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./api/msalConfig.js";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import App from "./App.jsx";
import SocketClient from "./socket/SocketClient.js";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./MyTheme.js";

export const socketClient = new SocketClient();
export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={darkTheme}>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </MsalProvider>
    </Provider>
  </BrowserRouter>
);
