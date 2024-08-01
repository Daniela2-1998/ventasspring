import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Form, Button, InputGroup, Alert, Container } from 'react-bootstrap';
import { FaSearch, FaFilePdf, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import empleadoService from '../services/empleadoService';


const PageContainer = styled(Container)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 10rem;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0;
    box-shadow: none;
  }
`;

const StyledTitle = styled.h2`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const StyledTable = styled(Table)`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  
  th {
    background-color: rgb(92, 35, 146);
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(180, 177, 177, 0.1);
  }
`;

const StyledButton = styled(Button)`
  background-color: rgb(92, 35, 146);
  border-color: rgb(92, 35, 146);
  &:hover {
    background-color: rgb(72, 25, 116);
    border-color: rgb(72, 25, 116);
  }
`;

const StyledForm = styled(Form)`
  margin-bottom: 1.5rem;
`;

const StyledInputGroup = styled(InputGroup)`
  .form-control {
    border-right: none;
  }
  .btn {
    border-left: 2px solid #fff;
  }
`;

const PdfButton = styled(StyledButton)`
  color: #fff;
`;

const ActionButton = styled(Button)`
  background-color: transparent;
  border-color: rgb(92, 35, 146);
  color: rgb(92, 35, 146);
  margin-right: 5px;
  
  &:hover {
    background-color: rgb(92, 35, 146);
    color: white;
  }
`;

const AddButton = styled(StyledButton)`
  margin-bottom: 1rem;
`;


const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadEmpleados();
  }, [currentPage]);

  const loadEmpleados = async () => {
    try {
      const data = await empleadoService.getAllEmpleados(currentPage);
      setEmpleados(data.content);
      setError('');
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      setError('Error al cargar los empleados. Por favor, intente de nuevo.');
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
      const empleado = await empleadoService.getEmpleadoById(id);
      setEmpleados([empleado]);
      setError('');
    } catch (error) {
      console.error('Error al buscar empleado:', error);
      setError('Error al buscar el empleado. Por favor, intente de nuevo.');
      setEmpleados([]);
    }
  };

  const handleReset = () => {
    setSearchId('');
    loadEmpleados();
  };

  const handleRowClick = (id) => {
    navigate(`/empleados/${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/empleados/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('¿Está seguro de que desea eliminar este empleado?')) {
      try {
        await empleadoService.deleteEmpleado(id);
        loadEmpleados();
        setError('');
      } catch (error) {
        console.error('Error al eliminar empleado:', error);
        setError('Error al eliminar el empleado. Por favor, intente de nuevo.');
      }
    }
  };

  const handleDownloadPdf = () => {
    console.log('Descargando PDF...');
  };

  const handleAddNew = () => {
    navigate('/empleados/nuevo');
  };

  return (
    <PageContainer>
      <StyledTitle>Lista de Empleados</StyledTitle>

      <AddButton onClick={handleAddNew}>
        <FaPlus /> Agregar Empleado
      </AddButton>

      <StyledForm onSubmit={handleSearch}>
        <StyledInputGroup>
          <Form.Control
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            min="1"
          />
          <StyledButton variant="primary" type="submit">
            <FaSearch />
          </StyledButton>
          <StyledButton variant="secondary" onClick={handleReset}>
            Resetear
          </StyledButton>
          <PdfButton variant="info" onClick={handleDownloadPdf}>
            <FaFilePdf /> PDF
          </PdfButton>
        </StyledInputGroup>
      </StyledForm>

      {error && <Alert variant="danger">{error}</Alert>}

      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Fecha de Nacimiento</th>
            <th>Cargo</th>
            <th>Teléfono</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(empleado => (
            <tr key={empleado.id} onClick={() => handleRowClick(empleado.id)} style={{ cursor: 'pointer' }}>
              <td>{empleado.id}</td>
              <td>{empleado.nombreCompleto}</td>
              <td>{empleado.fechaNacimiento}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.salario}</td>
              <td onClick={e => e.stopPropagation()}>
                <ActionButton onClick={(e) => handleEdit(e, empleado.id)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton onClick={(e) => handleDelete(e, empleado.id)}>
                  <FaTrash />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {!searchId && (
        <div className="d-flex justify-content-between mt-3">
          <StyledButton
            variant="secondary"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            Anterior
          </StyledButton>
          <StyledButton
            variant="secondary"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Siguiente
          </StyledButton>
        </div>
      )}
    </PageContainer>
  );
};

export default EmpleadoList;
