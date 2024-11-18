// App.js
import React from 'react';
import './styles.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IndicationForm from './Components/IndicationForm';
import Indications from './Components/Indications'
import Home from './Components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/indicar" element={<IndicationForm />} />
        <Route path="/indicacoes" element={<Indications />} />
        <Route path="*" element={<Navigate to="/home" />} /> {/* Redireciona rotas desconhecidas para /home */}
      </Routes>
    </Router>
  );
}

export default App;
