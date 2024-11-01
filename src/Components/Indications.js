// src/Components/Indications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function Indications() {
  const [indications, setIndications] = useState([]);
  const [filter, setFilter] = useState(''); // Estado para armazenar o texto do filtro
  const [statusFilter, setStatusFilter] = useState(''); // Estado para armazenar o filtro de status
  const [selectedStatus, setSelectedStatus] = useState(''); // Estado para armazenar o status selecionado
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

  // Filtrando indicações com base no texto de filtro e no status
  const filteredIndications = indications.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(filter.toLowerCase()) ||
                        item.student.name.toLowerCase().includes(filter.toLowerCase()) ||
                        item.guardian.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true; // Filtra pelo status se selecionado
    return matchesName && matchesStatus;
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIndications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIndications.length / itemsPerPage);

  // Função para enviar a requisição com o status selecionado
  const handleStatusUpdate = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:3333/api/indications/${itemId}`, {
        status: selectedStatus,
      });
      if (response.data.status === 'success') {
        // Atualiza a lista de indicações após a requisição
        setIndications((prev) => prev.map((item) =>
          item.id === itemId ? { ...item, status: selectedStatus } : item
        ));
        setSelectedStatus(''); // Limpa o status selecionado
      } else {
        console.error('Erro ao atualizar o status:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="indications-container">
      <h2>Indicações</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar indicações..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Atualiza o estado do filtro
          className="form-control"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)} // Atualiza o estado do filtro de status
          className="form-control"
        >
          <option value="">Todos os Status</option>
          <option value="SUCESSO">MATRICULADO</option>
          <option value="INDICADO">INDICADO</option>
          <option value="EM_PROGRESSO">EM PROGRESSO</option>
          <option value="FALHA">NÃO MATRICULADO</option>
          {/* Adicione outras opções de status conforme necessário */}
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
            <th>Ações</th> {/* Nova coluna para as ações */}
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
                  onChange={(e) => setSelectedStatus(e.target.value)} // Atualiza o estado do status selecionado
                  className="form-control"
                >
                  <option value="">Escolher Status</option>
                  <option value="SUCESSO">MATRICULADO</option>
                  <option value="INDICADO">INDICADO</option>
                  <option value="EM_PROGRESSO">EM PROGRESSO</option>
                  <option value="FALHA">NÃO MATRICULADO</option>
                  {/* Adicione outras opções de status conforme necessário */}
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
