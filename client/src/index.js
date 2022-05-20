import React from 'react';
import reactDom from 'react-dom';
import App from "./App";
import { ThemeProvider } from './context/ThemeContext';

import './index.css'


reactDom.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);