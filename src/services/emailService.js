import axios from 'axios';
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api/admin/users";

// Envio de emails
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

// Login
export const login = async (payload) => {
  try {
    return await axios.post('http://localhost:3000/api/auth/login', payload);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    toast.error(message);
    throw new Error(message);
  }
};

// Registro
export const register = async (payload) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', payload);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Erro ao enviar';
    toast.error(message);
    throw new Error(message);
  }
};

// ✅ Obter usuários
export const getUsers = async () => {
  const response = await axios.get(BASE_URL);
  if (Array.isArray(response.data)) return response.data;
  if (response.data && Array.isArray(response.data.users)) return response.data.users;
  return [];
};

// ✅ Alternar status do usuário
export const toggleUserStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === "ativo" ? "inativo" : "ativo";
  const response = await axios.patch(`${BASE_URL}/${id}/status`, { status: newStatus });
  return response.data.user; // retorna o objeto completo do usuário atualizado
};

// ✅ Alternar admin do usuário
export const updateUserAdmin = async (id, isAdmin) => {
  const response = await axios.patch(`${BASE_URL}/${id}/admin`, { isAdmin });
  return response.data.user; // retorna o objeto completo do usuário atualizado
};