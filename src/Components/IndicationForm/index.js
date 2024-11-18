// IndicationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import FormsIndicador from '../FormIndicador';
import FormsIndicado from '../FormIndicado';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Form from 'react-bootstrap/Form';


const backendUrl = process.env.REACT_APP_BACKEND_URL

function IndicationForm() {
  // const [formData1, setFormData1] = useState({ name: '', classs: '', shift: '', guardian: '', email: '' });
  // const [formData2, setFormData2] = useState({ name: '', classs: '', shift: '', guardian: '', phone: '', email: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [nameIndicator, setNameIndicator] = useState('');
  const [classIndicator, setClassIndicator] = useState('');
  const [shiftIndicator, setShiftIndicator] = useState('');
  const [guardianIndicator, setGuardianIndicator] = useState('');
  const [emailIndicator, setEmailIndicator] = useState('');
  const [nameIndicated, setNameIndicated] = useState('');
  const [classIndicated, setClassIndicated] = useState('');
  const [shiftIndicated, setShiftIndicated] = useState('');
  const [guardianIndicated, setGuardianIndicated] = useState('');
  const [phoneIndicated, setPhoneIndicated] = useState('');
  const [emailIndicated, setEmailIndicated] = useState('');


  // const handleFormDataChange1 = (data) => setFormData1(data);
  // const handleFormDataChange2 = (data) => setFormData2(data);

  const formData1 = { name: nameIndicator, classs: classIndicator, shift: shiftIndicator, guardian: guardianIndicator, email: emailIndicator }
  const formData2 = { name: nameIndicated, classs: classIndicated, shift: shiftIndicated, guardian: guardianIndicated, phone: phoneIndicated, email: emailIndicated}

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const combinedData = { student: formData1, indicator: formData2 }
    try {
      const response = await axios.post(`${backendUrl}/api/indications`, combinedData);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  };

  return (
    // <div className="app-container">
    //   <h1>Indicação Matrícula</h1>
    //   {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    //   {successMessage && <div className="alert alert-success">{successMessage}</div>}
    //   <div className="forms-container">
    //     <div className="form-item">
    //       <div className="form-header">Aluno Indicador</div>
    //       <FormsIndicador onDataChange={handleFormDataChange1} />
    //     </div>
    //     <div className="form-item">
    //       <div className="form-header">Aluno Indicado</div>
    //       <FormsIndicado onDataChange={handleFormDataChange2} />
    //     </div>
    //   </div>
    //   <button className="btn btn-primary submit-button" onClick={handleSubmit}>
    //     Enviar Indicação
    //   </button>
    // </div>
    <div className="app-container">
      <h1>Indicação Matrícula</h1>
      {/* {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>} */}
      <form className="forms-container" onSubmit={handleSubmit}>
        <div className="itens-container">
          <div className="item-details">
            <div className="form-header">Aluno Indicador</div>
            <div className="form-item">
              <Form.Group className="mb-3" controlId="formBasicNameIndicador">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome"
                  value={nameIndicator}
                  required
                  onChange={(e) => {
                    setNameIndicator(e.target.value);
                    // handleChange(); // Atualiza os dados no componente pai ao alterar
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicClassIndicador">
                <Form.Label>Turma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira a turma"
                  value={classIndicator}
                  required
                  onChange={(e) => {
                    setClassIndicator(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicShiftIndicador">
                <Form.Label>Turno</Form.Label>
                <Form.Select
                  value={shiftIndicator}
                  required
                  onChange={(e) => {
                    setShiftIndicator(e.target.value);
                    // handleChange();
                  }}
                >
                  <option value="">Selecione o turno</option>
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="INTEGRAL">Integral</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGuardianIndicador">
                <Form.Label>Nome do responsável</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome do responsável"
                  value={guardianIndicator}
                  required
                  onChange={(e) => {
                    setGuardianIndicator(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmailIndicador">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insira o email"
                  value={emailIndicator} // Corrigido para usar a variável de email
                  required
                  onChange={(e) => {
                    setEmailIndicator(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>
            </div>
          </div>

          <div className="item-details">
            <div className="form-header">Aluno Indicado</div>
            <div className="form-item">
              <Form.Group className="mb-3" controlId="formBasicNameIndicado">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome"
                  value={nameIndicated}
                  required
                  onChange={(e) => {
                    setNameIndicated(e.target.value);
                    // handleChange(); // Atualiza os dados no componente pai ao alterar
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicClassIndicado">
                <Form.Label>Turma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira a turma"
                  value={classIndicated}
                  required
                  onChange={(e) => {
                    setClassIndicated(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicShiftIndicado">
                <Form.Label>Turno</Form.Label>
                <Form.Select
                  value={shiftIndicated}
                  required
                  onChange={(e) => {
                    setShiftIndicated(e.target.value);
                    // handleChange();
                  }}
                >
                  <option value="">Selecione o turno</option>
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="INTEGRAL">Integral</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicGuardianIndicado">
                <Form.Label>Nome do responsável</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insira o nome do responsável"
                  value={guardianIndicated}
                  required
                  onChange={(e) => {
                    setGuardianIndicated(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhoneIndicado">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Insira o telefone"
                  value={phoneIndicated}
                  required
                  onChange={(e) => {
                    setPhoneIndicated(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmailIndicado">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insira o email"
                  value={emailIndicated} // Corrigido para usar a variável de email
                  required
                  onChange={(e) => {
                    setEmailIndicated(e.target.value);
                    // handleChange();
                  }}
                />
              </Form.Group>
            </div>
          </div>
        </div>


        <button className="btn btn-primary submit-button">
          Enviar Indicação
        </button>
      </form>
    </div>
  );
}

export default IndicationForm;
