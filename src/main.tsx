import React from 'react';
import ReactDOM from 'react-dom/client';
import { LemonMiniApp } from '@lemoncash/mini-app-sdk';
import App from './App';
import TimeWalletApp from "./TimeWalletApp";
import "./index.css";          // tailwind

LemonMiniApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
