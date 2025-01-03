import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EuiProvider } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_light.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import { ShopContextProvider } from './context/ShopContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EuiProvider >
    <AuthContextProvider>
      <ShopContextProvider>
        <App /> 
      </ShopContextProvider>
    </AuthContextProvider>
  </EuiProvider>
);

