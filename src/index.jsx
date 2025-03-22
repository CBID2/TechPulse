import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppProvider } from './Context';

const App = lazy(()=>import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <App/>
    </AppProvider>
);

