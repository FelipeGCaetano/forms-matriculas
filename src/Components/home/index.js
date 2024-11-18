// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Indicação de Matrícula</h1>
      <h4>O que deseja fazer?</h4>
      <div className="button-container">
        <Link to="/indicar">
          <button className="btn btn-primary">Nova Indicação</button>
        </Link>
        <Link to="/indicacoes">
          <button className="btn btn-primary">Ver Indicações</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
