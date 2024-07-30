import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import ClientesPage from './pages/ClientesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<ClientesPage />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
