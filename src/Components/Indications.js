// src/Components/Indications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function Indications() {
  const [indications, setIndications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de indicações por página

  useEffect(() => {
    const fetchIndications = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/indications');
        if (response.data.status === 'success') {
          setIndications(response.data.data);
        } else {
          console.error('Erro ao obter indicações:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    fetchIndications();
  }, []);

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = indications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(indications.length / itemsPerPage);

  return (
    <div className="indications-container">
      <h2>Indicações</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Aluno Indicado</th>
            <th>Classe</th>
            <th>Turno</th>
            <th>Responsável</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Nome do Aluno Indicador</th>
            <th>Email do Aluno Indicador</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.class}</td>
              <td>{item.shift}</td>
              <td>{item.guardian}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>{item.student.name}</td>
              <td>{item.student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Indications;
