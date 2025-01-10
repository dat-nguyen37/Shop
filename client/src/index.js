import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EuiProvider } from '@elastic/eui';
import "@elastic/eui/dist/eui_theme_light.css";
// import "@elastic/eui/dist/eui_theme_dark.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import { ShopContextProvider } from './context/ShopContext';
import { DarkModeContext, DarkModeContextProvider } from './context/DarkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Root = () => {
  return (
      <DarkModeContextProvider>
            <AuthContextProvider>
              <ShopContextProvider>
                <App />
              </ShopContextProvider>
            </AuthContextProvider>
      </DarkModeContextProvider>
  );
};
root.render(<Root />);

