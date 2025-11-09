import React from 'react';
import ReactDOM from 'react-dom/client';
import { LemonMiniApp } from '@lemoncash/mini-app-sdk';
import App from './App';

LemonMiniApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
