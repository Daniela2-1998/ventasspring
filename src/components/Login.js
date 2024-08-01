import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FaUser, FaLock, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const LoginContainer = styled(Container)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled(Form)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  background-color: rgb(92, 35, 146);
  border-color: rgb(92, 35, 146);
  color: white;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  &:hover {
    background-color: rgb(72, 25, 116);
    border-color: rgb(72, 25, 116);
  }
`;

const LogoIcon = styled(FaShoppingCart)`
  font-size: 4rem;
  color: rgb(92, 35, 146);
  margin-bottom: 1rem;
`;

const CenteredHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledLabel = styled(Form.Label)`
  font-weight: 600; // Hace el texto más bold
  color: rgb(92, 35, 146);
`;

const StyledInput = styled(Form.Control)`
  height: 40px;
  border-radius: 20px;
  width: 100%;
  padding-left: 15px; // Despega el texto del borde izquierdo
  border-color: #d0d0d0; // Color de borde más claro
  &:focus {
    border-color: rgb(92, 35, 146);
    box-shadow: 0 0 0 0.2rem rgba(92, 35, 146, 0.25);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StyledIcon = styled.span`
  margin-right: 0.5rem;
  color: rgb(92, 35, 146);
`;

const FormGroupWithMargin = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;



const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/usuarios');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <CenteredHeader>
          <LogoIcon />
          <h2>Iniciar Sesión</h2>
        </CenteredHeader>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormGroupWithMargin controlId="formBasicUsername">
          <IconWrapper>
            <StyledIcon><FaUser /></StyledIcon>
            <StyledLabel>Nombre de Usuario</StyledLabel>
          </IconWrapper>
          <StyledInput
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroupWithMargin>

        <FormGroupWithMargin controlId="formBasicPassword">
          <IconWrapper>
            <StyledIcon><FaLock /></StyledIcon>
            <StyledLabel>Contraseña</StyledLabel>
          </IconWrapper>
          <StyledInput
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroupWithMargin>

        <StyledButton variant="primary" type="submit">
          Iniciar Sesión
        </StyledButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
