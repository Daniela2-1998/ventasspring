import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import empleadoService from '../services/empleadoService';

const PageContainer = styled(Container)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 12rem;
  margin-bottom: 5rem;
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

const InfoEmpleado = () => {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const data = await empleadoService.getEmpleadoById(id);
                setEmpleado(data);
            } catch (error) {
                console.error('Error al obtener el empleado:', error);
                setError('Error al cargar los datos del empleado. Por favor, intente de nuevo.');
            }
        };
        fetchEmpleado();
    }, [id]);

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
            await empleadoService.updateEmpleado(empleado);
            setError('');
            setShowSuccessAlert(true);
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            setError('Error al actualizar los datos del empleado. Por favor, intente de nuevo.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Está seguro de que desea eliminar este empleado?')) {
            try {
                await empleadoService.deleteEmpleado(empleado.id);
                navigate('/empleados');
            } catch (error) {
                console.error('Error al eliminar empleado:', error);
                setError('Error al eliminar el empleado. Por favor, intente de nuevo.');
            }
        }
    };

    if (!empleado) return <div>Cargando...</div>;

    return (
        <PageContainer>
            <Title>Información del Empleado</Title>
            <IdBox>ID: {empleado.id}</IdBox>
            {error && <Alert variant="danger">{error}</Alert>}
            {showSuccessAlert && (
                <CustomAlert>
                    <span>
                        <FaCheckCircle /> Empleado modificado exitosamente
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
                        <StyledButton type="submit">Guardar Cambios</StyledButton>
                    </div>
                    <StyledButton variant="danger" onClick={handleDelete}>
                        Eliminar Empleado
                    </StyledButton>
                </div>
            </StyledForm>
        </PageContainer>
    );
};

export default InfoEmpleado;

