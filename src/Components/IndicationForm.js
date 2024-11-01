// IndicationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import FormsIndicador from './FormIndicador';
import FormsIndicado from './FormIndicado';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function IndicationForm() {
  const [formData1, setFormData1] = useState({ name: '', classs: '', shift: '', guardian: '', email: '' });
  const [formData2, setFormData2] = useState({ name: '', classs: '', shift: '', guardian: '', phone: '', email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormDataChange1 = (data) => setFormData1(data);
  const handleFormDataChange2 = (data) => setFormData2(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const combinedData = { student: formData1, indicator: formData2 };

    try {
      const response = await axios.post('http://localhost:3333/api/indications', combinedData);
      if (response.data.status === 'success') {
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Erro ao enviar os dados.');
    }
  };

  return (
    <div className="app-container">
      <h1>Indicação Matrícula</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="forms-container">
        <div className="form-item">
          <div className="form-header">Aluno Indicador</div>
          <FormsIndicador onDataChange={handleFormDataChange1} />
        </div>
        <div className="form-item">
          <div className="form-header">Aluno Indicado</div>
          <FormsIndicado onDataChange={handleFormDataChange2} />
        </div>
      </div>
      <button className="btn btn-primary submit-button" onClick={handleSubmit}>
        Enviar Indicação
      </button>
    </div>
  );
}

export default IndicationForm;
