// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import IndicationForm from './Components/IndicationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/indicar" element={<IndicationForm />} />
        <Route path="*" element={<Navigate to="/home" />} /> {/* Redireciona rotas desconhecidas para /home */}
      </Routes>
    </Router>
  );
}

export default App;
