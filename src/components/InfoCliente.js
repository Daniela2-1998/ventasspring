import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import clienteService from '../services/clienteService';

const PageContainer = styled(Container)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
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

const InfoCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await clienteService.getClienteById(id);
        setCliente(data);
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
        setError('Error al cargar los datos del cliente. Por favor, intente de nuevo.');
      }
    };
    fetchCliente();
  }, [id]);

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
      await clienteService.updateCliente(cliente);
      setError('');
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      setError('Error al actualizar los datos del cliente. Por favor, intente de nuevo.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      try {
        await clienteService.deleteCliente(cliente.id);
        navigate('/clientes');
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
        setError('Error al eliminar el cliente. Por favor, intente de nuevo.');
      }
    }
  };

  if (!cliente) return <div>Cargando...</div>;

  return (
    <PageContainer>
      <Title>Información del Cliente</Title>
      <IdBox>ID: {cliente.id}</IdBox>
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccessAlert && (
        <CustomAlert>
          <span>
            <FaCheckCircle /> Cliente modificado exitosamente
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
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            as="select"
            name="tipo"
            value={cliente.tipo}
            onChange={handleInputChange}
          >
            <option value="INDIVIDUAL">INDIVIDUAL</option>
            <option value="CORPORATIVO">CORPORATIVO</option>
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <div>
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            <StyledButton type="submit">Guardar Cambios</StyledButton>
          </div>
          <StyledButton variant="danger" onClick={handleDelete}>
            Eliminar Cliente
          </StyledButton>
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default InfoCliente;
