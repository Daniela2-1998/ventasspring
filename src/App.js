import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import ClientesPage from './pages/ClientesPage';
import InfoCliente from './components/InfoCliente';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/clientes/:id" element={<InfoCliente />} />

      </Routes>
    </Router>
  );
}

export default App;
