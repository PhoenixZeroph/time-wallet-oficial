import React from "react";
import { createRoot } from "react-dom/client";
import TimeWalletApp from "./TimeWalletApp";

const container = document.getElementById("app")!;
createRoot(container).render(
  <React.StrictMode>
    <TimeWalletApp />
  </React.StrictMode>
);
