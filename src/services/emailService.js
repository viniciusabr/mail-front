import api from './api';
import { toast } from "react-toastify";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado. Faça login novamente.");
  return token;
};

// Envio de emails
export const sendEmails = async (payload) => {
  const token = getToken();

  try {
    await api.post('/api/email/send', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};

// Login
export const login = async (payload) => {
  try {
    return await api.post('/api/auth/login', payload);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    throw new Error(message);
  }
};

// Registro
export const register = async (payload) => {
  try {
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    throw new Error(message);
  }
};

// Obter usuários
export const getUsers = async () => {
  const { data } = await api.get('/api/users');
  return data.users || data || [];
};

// Alternar status
export const toggleUserStatus = async (id, currentStatus) => {
  const status = currentStatus === "ativo" ? "inativo" : "ativo";
  const { data } = await api.patch(`/api/users/${id}/status`, { status });
  return data.user;
};

// Admin
export const updateUserAdmin = async (id, isAdmin) => {
  const { data } = await api.patch(`/api/users/${id}/admin`, { isAdmin });
  return data.user;
};

// Perfil
export const getProfile = async () => {
  const token = getToken();
  const { data } = await api.get('/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// Atualizar perfil
export const updateProfile = async (payload) => {
  const token = getToken();
  const { data } = await api.put('/api/users/me', payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  toast.success(data.message);
  return data.user;
};

// Alterar senha
export const changePassword = async (payload) => {
  const token = getToken();
  const { data } = await api.put('/api/users/me/password', payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  toast.success(data.message);
  return true;
};

// Senha do app
export const changePasswordApp = async ({ appPassword }) => {
  const token = getToken();
  const { data } = await api.put('/api/users/me/app-password', { appPassword }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  toast.success(data.message);
  return true;
};
