import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  background-color: rgb(92, 35, 146);
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const WelcomeText = styled.span`
  color: white;
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: white;
    color: rgb(92, 35, 146);
  }
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavList>
        <NavGroup>
          <NavItem>
            <NavLink to="/home">Inicio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/usuarios">Usuarios</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/clientes">Clientes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/empleados">Empleados</NavLink>
          </NavItem>
        </NavGroup>
        {user && (
          <NavGroup>
            <WelcomeText>Bienvenido, {user.nombreUsuario}</WelcomeText>
            <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
          </NavGroup>
        )}
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;

