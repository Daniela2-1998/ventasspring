import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUsers, FaUserTie, FaBoxes, FaTruck, FaChartLine, FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-top: 7rem;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const StyledCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: rgb(92, 35, 146);
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HomePage = () => {
  return (
    <StyledContainer>
      <Title>Sistema de Gestión Empresarial</Title>
      <Subtitle>Optimiza y controla todos los aspectos de tu negocio</Subtitle>
      
      <Row className="g-4">
        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaUsers />
              </IconWrapper>
              <Card.Title>Gestión de Clientes</Card.Title>
              <Card.Text>
                Administra eficientemente la información de tus clientes y sus interacciones.
              </Card.Text>
              <StyledLink to="/clientes" className="mt-auto">
                <Button variant="primary">Ir a Clientes</Button>
              </StyledLink>
            </Card.Body>
          </StyledCard>
        </Col>
        
        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaUserTie />
              </IconWrapper>
              <Card.Title>Gestión de Empleados</Card.Title>
              <Card.Text>
                Controla la información de tu personal y optimiza los recursos humanos.
              </Card.Text>
              <StyledLink to="/empleados" className="mt-auto">
                <Button variant="primary">Ir a Empleados</Button>
              </StyledLink>
            </Card.Body>
          </StyledCard>
        </Col>
        
        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaBoxes />
              </IconWrapper>
              <Card.Title>Gestión de Productos</Card.Title>
              <Card.Text>
                Administra tu inventario, categorías y marcas de productos eficientemente.
              </Card.Text>
              <Button variant="primary" className="mt-auto" disabled>Próximamente</Button>
            </Card.Body>
          </StyledCard>
        </Col>
        
        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaTruck />
              </IconWrapper>
              <Card.Title>Operaciones</Card.Title>
              <Card.Text>
                Gestiona compras, ventas, transporte, importaciones y exportaciones.
              </Card.Text>
              <Button variant="primary" className="mt-auto" disabled>Próximamente</Button>
            </Card.Body>
          </StyledCard>
        </Col>
        
        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaChartLine />
              </IconWrapper>
              <Card.Title>Contabilidad</Card.Title>
              <Card.Text>
                Lleva el control financiero de tu empresa con herramientas avanzadas.
              </Card.Text>
              <Button variant="primary" className="mt-auto" disabled>Próximamente</Button>
            </Card.Body>
          </StyledCard>
        </Col>

        <Col md={4}>
          <StyledCard>
            <Card.Body className="d-flex flex-column align-items-center">
              <IconWrapper>
                <FaBuilding />
              </IconWrapper>
              <Card.Title>Gestión de Usuarios</Card.Title>
              <Card.Text>
                Administra los usuarios del sistema y sus permisos de acceso.
              </Card.Text>
              <StyledLink to="/usuarios" className="mt-auto">
                <Button variant="primary">Ir a Usuarios</Button>
              </StyledLink>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default HomePage;