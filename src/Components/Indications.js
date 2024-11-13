import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Indications() {
  const [indications, setIndications] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIndications = async () => {
      setErrorMessage(''); // Limpa qualquer mensagem de erro antes da nova requisição
      try {
        const response = await axios.get(`${backendUrl}/api/indications`);
        if (response.data.status === 'success') {
          setIndications(response.data.data);
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        setErrorMessage('Erro ao fazer a requisição ao backend');
      }
    };

    fetchIndications();
  }, []); // Esse useEffect é chamado apenas uma vez ao montar o componente

  const filteredIndications = indications.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(filter.toLowerCase()) ||
                        item.student.name.toLowerCase().includes(filter.toLowerCase()) ||
                        item.guardian.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIndications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIndications.length / itemsPerPage);

  const handleStatusUpdate = async (itemId) => {
    try {
      const response = await axios.put(`${backendUrl}/api/indications/${itemId}`, {
        status: selectedStatus,
      });
      if (response.data.status === 'success') {
        setIndications((prev) => prev.map((item) =>
          item.id === itemId ? { ...item, status: selectedStatus } : item
        ));
        setSelectedStatus('');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setErrorMessage('Erro ao fazer a requisição ao backend');
    }
  };

  return (
    <div className="indications-container">
      <h2>Indicações</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar indicações..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-control"
        >
          <option value="">Todos os Status</option>
          <option value="SUCESSO">MATRICULADO</option>
          <option value="INDICADO">INDICADO</option>
          <option value="EM_PROGRESSO">EM PROGRESSO</option>
          <option value="FALHA">NÃO MATRICULADO</option>
        </select>
      </div>
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
            <th>Ações</th>
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
              <td className="Action">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="">Escolher Status</option>
                  <option value="SUCESSO">MATRICULADO</option>
                  <option value="INDICADO">INDICADO</option>
                  <option value="EM_PROGRESSO">EM PROGRESSO</option>
                  <option value="FALHA">NÃO MATRICULADO</option>
                </select>
                <button className="btn btn-primary" onClick={() => handleStatusUpdate(item.id)}>Atualizar Status</button>
              </td>
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
