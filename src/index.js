// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Seleciona o elemento HTML onde o React será montado
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
