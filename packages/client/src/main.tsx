import "@emotion/react";
import "@emotion/styled";
import "buffer/";
import process from "process";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./components/App/App";
import { web3AuthModalPack } from "./features/authentication/types";
import { modalConfig, openLoginAdapter, safeScrollOptions } from "./services/safe";

window.process = { ...process, env: { NODE_ENV: "production" } } as any;

web3AuthModalPack.init({ options: safeScrollOptions, adapters: [openLoginAdapter], modalConfig }).then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
});
