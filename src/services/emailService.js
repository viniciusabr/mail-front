import axios from 'axios';

export async function sendEmails(payload) {
  try {
    await axios.post('http://localhost:3000/api/customers', payload);
    return true;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    throw new Error(message);
  }
}
