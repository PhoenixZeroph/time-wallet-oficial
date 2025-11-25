import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";               // ← componente raíz definitivo

const container = document.getElementById("app")!;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />                            {/* Time-Wallet UI */}
  </React.StrictMode>
);
