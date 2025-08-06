import axios from 'axios';

export const sendEmails = async (payload) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token não encontrado. Faça login novamente.');
  }

  try {
    await axios.post('http://localhost:3000/api/customers', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return true;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    throw new Error(message);
  }
};


export const login = async (payload) => {
  try {
    return await axios.post('http://localhost:3000/api/auth/login', payload);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    throw new Error(message);
  }
}


export const register = async (payload) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', payload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    throw new Error(message);
  }
}
