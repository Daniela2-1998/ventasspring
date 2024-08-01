import axios from 'axios';

const API_URL = 'http://localhost:5051/auth/';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(API_URL + 'login', { nombreUsuario: username, contraseña: password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.mensaje || 'Error en el inicio de sesión');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default authService;
