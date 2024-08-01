import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import empleadoService from '../services/empleadoService';

const PageContainer = styled(Container)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 10rem;
  margin-bottom: 5rem;
`;

const Title = styled.h2`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 1.5rem;
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

const NuevoEmpleado = () => {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState({
    nombreCompleto: '',
    fechaNacimiento: '',
    cargo: '',
    telefono: '',
    salario: '',
    usuario: { id: '' }
  });
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'usuario') {
      setEmpleado(prevEmpleado => ({
        ...prevEmpleado,
        usuario: { id: value }
      }));
    } else {
      setEmpleado(prevEmpleado => ({
        ...prevEmpleado,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await empleadoService.createEmpleado(empleado);
      setError('');
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      setError('Error al crear el empleado. Por favor, intente de nuevo.');
    }
  };

  return (
    <PageContainer>
      <Title>Crear Nuevo Empleado</Title>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccessAlert && (
        <CustomAlert>
          <span>
            <FaCheckCircle /> Empleado creado exitosamente
          </span>
          <AlertButton onClick={() => navigate('/empleados')}>
            Regresar a la lista
          </AlertButton>
        </CustomAlert>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="nombreCompleto"
                value={empleado.nombreCompleto}
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
                value={empleado.fechaNacimiento}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                type="text"
                name="cargo"
                value={empleado.cargo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={empleado.telefono}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Salario</Form.Label>
              <Form.Control
                type="number"
                name="salario"
                value={empleado.salario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ID de Usuario</Form.Label>
              <Form.Control
                type="number"
                name="usuario"
                value={empleado.usuario.id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <div>
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            <StyledButton type="submit">Crear Empleado</StyledButton>
          </div>
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default NuevoEmpleado;
