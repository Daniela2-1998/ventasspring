import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Login from './components/Login';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'; 

import UsuarioList from './components/UsuarioList';
import NuevoUsuario from './components/NuevoUsuario';
import InfoUsuario from './components/InfoUsuario';

import ClienteList from './components/ClienteList';
import NuevoCliente from './components/NuevoCliente';
import InfoCliente from './components/InfoCliente';

import EmpleadoList from './components/EmpleadoList';
import NuevoEmpleado from './components/NuevoEmpleado';
import InfoEmpleado from './components/InfoEmpleado';

import Footer from './components/Footer';

import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';


// Componente estilizado para el contenido principal
const ContenidoPrincipal = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Componente estilizado para empujar el footer hacia abajo
const ContenedorContenido = styled.div`
  flex: 1 0 auto;
`;

// Componente para rutas protegidas
const RutaProtegida = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ContenidoPrincipal>
          <ContenedorContenido>
            <AuthContext.Consumer>
              {({ user }) => (
                <>
                  {user && <Navbar />}
                  <Routes>
                    <Route path="/" element={user ? <HomePage /> : <Login />} />
                    <Route
                      path="/home"
                      element={
                        <RutaProtegida>
                          <HomePage />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/usuarios"
                      element={
                        <RutaProtegida>
                          <UsuarioList />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/usuarios/nuevo"
                      element={
                        <RutaProtegida>
                          <NuevoUsuario />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/usuarios/:id"
                      element={
                        <RutaProtegida>
                          <InfoUsuario />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/clientes"
                      element={
                        <RutaProtegida>
                          <ClienteList />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/clientes/nuevo"
                      element={
                        <RutaProtegida>
                          <NuevoCliente />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/clientes/:id"
                      element={
                        <RutaProtegida>
                          <InfoCliente />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/empleados"
                      element={
                        <RutaProtegida>
                          <EmpleadoList />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/empleados/nuevo"
                      element={
                        <RutaProtegida>
                          <NuevoEmpleado />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/empleados/:id"
                      element={
                        <RutaProtegida>
                          <InfoEmpleado />
                        </RutaProtegida>
                      }
                    />
                  </Routes>
                </>
              )}
            </AuthContext.Consumer>
          </ContenedorContenido>
          <Footer />
        </ContenidoPrincipal>
      </Router>
    </AuthProvider>
  );
}

export default App;
