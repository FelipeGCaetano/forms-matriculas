// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Indicação de Matrícula</h1>
      <p>Para fazer uma indicação, clique no botão abaixo.</p>
      <Link to="/indicar">
        <button className="btn btn-primary">Ir para Indicação</button>
      </Link>
    </div>
  );
}

export default Home;
