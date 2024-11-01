// FormsIndicado.js
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function FormsIndicado({ onDataChange }) {
  const [name, setName] = useState('');
  const [classs, setClasss] = useState('');
  const [shift, setShift] = useState('');
  const [guardian, setGuardian] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = () => {
    onDataChange({ name, classs, shift, guardian, phone, email });
  };

  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicNameIndicado">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange(); // Atualiza os dados no componente pai ao alterar
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicClassIndicado">
          <Form.Label>Turma</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira a turma"
            value={classs}
            onChange={(e) => {
              setClasss(e.target.value);
              handleChange();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicShiftIndicado">
          <Form.Label>Turno</Form.Label>
          <Form.Select
            value={shift}
            onChange={(e) => {
              setShift(e.target.value);
              handleChange();
            }}
          >
            <option value="">Selecione o turno</option>
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGuardianIndicado">
          <Form.Label>Nome do pai</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o nome do pai"
            value={guardian}
            onChange={(e) => {
              setGuardian(e.target.value);
              handleChange();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneIndicado">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Insira o telefone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              handleChange();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmailIndicado">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o email"
            value={email} // Corrigido para usar a variável de email
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange();
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default FormsIndicado;
