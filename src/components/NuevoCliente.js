import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import clienteService from '../services/clienteService';


const PageContainer = styled(Container)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 10rem;
  margin-bottom: 10rem;
`;

const Title = styled.h2`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 1.5rem;
`;

const IdBox = styled.div`
  background-color: rgb(92, 35, 146);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 1rem;
`;

const StyledForm = styled(Form)`
  margin-top: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: rgb(92, 35, 146);
  border-color: rgb(92, 35, 146);
  &:hover {
    background-color: rgb(72, 25, 116);
    border-color: rgb(72, 25, 116);
  }
`;

const BackButton = styled(StyledButton)`
  margin-right: 1rem;
`;

const CustomAlert = styled(Alert)`
  background-color: rgb(92, 35, 146);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlertButton = styled(Button)`
  background-color: white;
  color: rgb(92, 35, 146);
  border: none;
  &:hover {
    background-color: #f0f0f0;
    color: rgb(72, 25, 116);
  }
`;

const NuevoCliente = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    fechaNacimiento: '',
    dni: '',
    telefono: '',
    direccion: '',
    tipo: 'INDIVIDUAL'
  });
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteService.createCliente(cliente);
      setError('');
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      setError('Error al crear el cliente. Por favor, intente de nuevo.');
    }
  };

  return (
    <PageContainer>
      <Title>Crear Nuevo Cliente</Title>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccessAlert && (
        <CustomAlert>
          <span>
            <FaCheckCircle /> Cliente creado exitosamente
          </span>
          <AlertButton onClick={() => navigate('/clientes')}>
            Regresar a la lista
          </AlertButton>
        </CustomAlert>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={cliente.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={cliente.fechaNacimiento}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={cliente.dni}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={cliente.telefono}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            as="select"
            name="tipo"
            value={cliente.tipo}
            onChange={handleInputChange}
            required
          >
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="CORPORATIVO">CORPORATIVO</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <div>
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            <StyledButton type="submit">Crear Cliente</StyledButton>
          </div>
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default NuevoCliente;
