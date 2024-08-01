import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import usuarioService from '../services/usuarioService';

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

const NuevoUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombreUsuario: '',
    contraseña: '',
    mail: '',
    rol: '',
    estado: 'ACTIVO'
  });
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usuarioService.createUsuario(usuario);
      setError('');
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setError('Error al crear el usuario. Por favor, intente de nuevo.');
    }
  };

  return (
    <PageContainer>
      <Title>Crear Nuevo Usuario</Title>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccessAlert && (
        <CustomAlert>
          <span>
            <FaCheckCircle /> Usuario creado exitosamente
          </span>
          <AlertButton onClick={() => navigate('/usuarios')}>
            Regresar a la lista
          </AlertButton>
        </CustomAlert>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                value={usuario.nombreUsuario}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={usuario.contraseña}
                onChange={handleInputChange}
                placeholder='Incluir: mayúscula, minúscula, número y carácter especial'
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                value={usuario.mail}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="rol"
                value={usuario.rol}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="VISITANTE">VISITANTE</option>
                <option value="EMPLEADO">EMPLEADO</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as="select"
            name="estado"
            value={usuario.estado}
            onChange={handleInputChange}
            required
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
            <option value="SUSPENDIDO">SUSPENDIDO</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <div>
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            <StyledButton type="submit">Crear Usuario</StyledButton>
          </div>
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default NuevoUsuario;
