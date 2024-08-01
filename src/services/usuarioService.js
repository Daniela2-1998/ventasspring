import axios from 'axios';

const API_URL = 'http://localhost:5051/usuarios'; 

const usuarioService = {
  getAllUsuarios: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getUsuarioById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createUsuario: async (usuario) => {
    const response = await axios.post(`${API_URL}/agregar`, usuario);
    return response.data;
  },

  updateUsuario: async (usuario) => {
    const response = await axios.put(`${API_URL}/actualizar`, usuario);
    return response.data;
  },

  deleteUsuario: async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  }
};

export default usuarioService;
