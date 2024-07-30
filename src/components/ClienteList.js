import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaSearch, FaFilePdf, FaEdit, FaTrash } from 'react-icons/fa';
import clienteService from '../services/clienteService';

const StyledContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const StyledTitle = styled.h2`
  color: #4a0e4e;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid #6c757d;
  padding-bottom: 10px;
`;

const StyledTable = styled(Table)`
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchId, setSearchId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadClientes();
    }, [currentPage]);

    const loadClientes = async () => {
        try {
            const data = await clienteService.getAllClientes(currentPage);
            setClientes(data.content);
            setError('');
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            setError('Error al cargar los clientes. Por favor, intente de nuevo.');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) {
            setError('Por favor, ingrese un ID válido.');
            return;
        }

        const id = parseInt(searchId, 10);
        if (isNaN(id) || id <= 0) {
            setError('Por favor, ingrese un ID válido (número entero positivo).');
            return;
        }

        try {
            const cliente = await clienteService.getClienteById(id);
            setClientes([cliente]);
            setError('');
        } catch (error) {
            console.error('Error al buscar cliente:', error);
            setError('No se encontró ningún cliente con ese ID.');
            setClientes([]);
        }
    };


    const handleReset = () => {
        setSearchId('');
        loadClientes();
    };

    const handleDownloadPdf = () => {
        // Aquí iría la lógica para descargar PDF
        console.log('Descargando PDF...');
    };

    return (
        <StyledContainer>
            <StyledTitle>Lista de Clientes</StyledTitle>

            <Form onSubmit={handleSearch} className="mb-3">
                <InputGroup>
                    <Form.Control
                        type="number"
                        placeholder="Buscar por ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        min="1"
                    />

                    <Button variant="outline-secondary" type="submit">
                        <FaSearch />
                    </Button>
                    <Button variant="outline-secondary" onClick={handleReset}>
                        Resetear
                    </Button>
                    <Button variant="outline-secondary" onClick={handleDownloadPdf}>
                        <FaFilePdf /> Descargar PDF
                    </Button>
                </InputGroup>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Fecha de Nacimiento</th>
                        <th>DNI</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.fechaNacimiento}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.tipo}</td>
                            <td>
                                <Button variant="outline-primary" size="sm" className="me-2">
                                    <FaEdit />
                                </Button>
                                <Button variant="outline-danger" size="sm">
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>

            {!searchId && (
                <div className="d-flex justify-content-between mt-3">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Siguiente
                    </Button>
                </div>
            )}
        </StyledContainer>
    );
};

export default ClienteList;
