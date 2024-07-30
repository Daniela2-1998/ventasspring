import axios from 'axios';

const API_URL = 'http://localhost:5051/clientes'; 

const clienteService = {
  getAllClientes: async (page = 0, size = 10, sortBy = 'id') => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    return response.data;
  },

  getClienteById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCliente: async (clienteData) => {
    const response = await axios.post(`${API_URL}/agregar`, clienteData);
    return response.data;
  },

  updateCliente: async (clienteData) => {
    const response = await axios.put(`${API_URL}/actualizar`, clienteData);
    return response.data;
  },

  deleteCliente: async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  }
};

export default clienteService;
