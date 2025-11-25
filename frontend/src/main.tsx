import React from "react";
import ReactDOM from "react-dom/client";
import TimeWalletApp from "./TimeWalletApp";
import "./index.css";          // tailwind

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TimeWalletApp />
  </React.StrictMode>
);
