// FormsIndicador.js
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function FormsIndicador({ onDataChange }) {
  const [name, setName] = useState('');
  const [classs, setClasss] = useState('');
  const [shift, setShift] = useState('');
  const [guardian, setGuardian] = useState('');
  const [email, setEmail] = useState('');

  // const handleChange = () => {
  //   onDataChange({ name, classs, shift, guardian, email }); 
  // };

  useEffect(() => {
    onDataChange({ name, classs, shift, guardian, email });
  }, [name, classs, shift, guardian, email])

  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o nome"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
              // handleChange(); // Atualiza os dados no componente pai ao alterar
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClass">
          <Form.Label>Turma</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira a turma"
            value={classs}
            required
            onChange={(e) => {
              setClasss(e.target.value);
              // handleChange();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicShiftIndicado">
          <Form.Label>Turno</Form.Label>
          <Form.Select
            value={shift}
            onChange={(e) => {
              setShift(e.target.value);
              // handleChange();
            }}
          >
            <option value="">Selecione o turno</option>
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="INTEGRAL">Integral</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGuardian">
          <Form.Label>Nome do responsável</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o nome do pai"
            value={guardian}
            onChange={(e) => {
              setGuardian(e.target.value);
              // handleChange();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // handleChange();
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormsIndicador;
