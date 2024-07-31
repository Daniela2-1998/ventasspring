import axios from 'axios';

const API_URL = 'http://localhost:5051/clientes'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


const clienteService = {
  getAllClientes: async (page = 0, size = 10, sortBy = 'id') => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    return response.data;
  },

  getClienteById: async (id) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error en getClienteById:', error.response || error.message);
      throw error;
    }
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
