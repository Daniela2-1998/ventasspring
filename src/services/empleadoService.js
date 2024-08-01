import axios from 'axios';

const API_URL = 'http://localhost:5051/empleados'; 

const empleadoService = {
  getAllEmpleados: async (page = 0, size = 10, sortBy = 'id') => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    return response.data;
  },

  getEmpleadoById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createEmpleado: async (empleado) => {
    const response = await axios.post(`${API_URL}/agregar`, empleado);
    return response.data;
  },

  updateEmpleado: async (empleado) => {
    const response = await axios.put(`${API_URL}/actualizar`, empleado);
    return response.data;
  },

  deleteEmpleado: async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  }
};

export default empleadoService;